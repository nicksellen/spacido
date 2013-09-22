angular.module('project', ['ng', 'ngResource', 'ui.slider']).

  factory('Entries', function($resource) {
    return $resource(
        '/json/:category.json'
    );
  }).

  factory('Entry', function($resource) {
    return $resource('/json/:category/:slug.json', { slug: '@slug' });
  }).

  config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: IndexCtrl, templateUrl: 'home.html'}).
      when('/search/:category', { controller: ListCtrl, templateUrl: 'list.html'}).
      when('/details/:category/:slug', { controller: DetailsController, templateUrl: 'details.html'}).
      otherwise({redirectTo:'/'});
  });

function IndexCtrl($scope) {
}
 
function ListCtrl($scope, $location, $routeParams, Entries) {
  $scope.category = $routeParams.category;
  $scope.entries = Entries.query({ category: $routeParams.category });
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
  $scope.entry = Entry.get({ category: $routeParams.category, slug: $routeParams.slug });
}