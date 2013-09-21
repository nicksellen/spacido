angular.module('project', ['ng', 'ngResource']).

  factory('Entries', function($resource) {
    return $resource(
        '/json/entries.json'
    );
  }).

  factory('Entry', function($resource) {
    return $resource('/json/entry/:slug.json', { slug: '@slug' });
  }).

  config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: IndexCtrl, templateUrl: 'home.html'}).
      when('/search', { controller: ListCtrl, templateUrl: 'list.html'}).
      when('/details/:slug', { controller: DetailsController, templateUrl: 'details.html'}).
      otherwise({redirectTo:'/'});
  });
 
function ListCtrl($scope, Entries) {
  $scope.entries = Entries.query();
  $scope.count = function() { return $scope.entries.length; };
}
 
function DetailsController($scope, $location, $routeParams, Entry) {
  console.log('params', $routeParams.slug);
  $scope.entry = Entry.get({ slug: $routeParams.slug });
}