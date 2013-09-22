angular.module('project', ['ng', 'ngResource', 'ui.slider']).

  factory('Entries', function($resource) {
    return $resource(
        '/json/:type.json'
    );
  }).

  factory('Entry', function($resource) {
    return $resource('/json/entry/:slug.json', { slug: '@slug' });
  }).

  config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: IndexCtrl, templateUrl: 'home.html'}).
      when('/search/:type', { controller: ListCtrl, templateUrl: 'list.html'}).
      when('/details/:slug', { controller: DetailsController, templateUrl: 'details.html'}).
      otherwise({redirectTo:'/'});
  });

function IndexCtrl($scope) {
}
 
function ListCtrl($scope, $location, $routeParams, Entries) {
  console.log('listing things of type', $routeParams.type);
  $scope.entries = Entries.query({ type: $routeParams.type });
  $scope.predicate = '-price';
  $scope.sliderVal = {first: 30}
  $scope.greaterThanNum = function(expected) {
    return expected.price <= $scope.sliderVal.first;
  };

  $scope.count = function() { return $scope.entries.length; };

  $scope.range = function(min, max) {
    var input = [];
    for (var i=min; i<=max; i++) { input.push(i) };
    return input;
  };

}
 
function DetailsController($scope, $location, $routeParams, Entry) {
  console.log('params', $routeParams.slug);
  $scope.entry = Entry.get({ slug: $routeParams.slug });
}