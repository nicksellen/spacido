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
    $scope.spaceCat = [
      {
          "name": "rehearsal room"
      },
      {
          "name": "garden"
      },
      {
          "name": "kitchen"
      },
      {
          "name": "studio"
      },
      {
          "name": "workshop"
      }
  ]
}
 
function ListCtrl($scope, $location, $routeParams, Entries) {
  $scope.category = $routeParams.category;
  $scope.entries = Entries.query({ category: $routeParams.category });

  /*$scope.entries = Entries.query(function (response) {
      angular.forEach(response, function (item) {
        console.log(item);
        $scope.markersProperty.push({
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon)
        });
      });
    });*/

  angular.extend($scope, {

      position: {
        coords: {
          latitude: 52.5,
          longitude: 13.3
        }
      },

      /** the initial center of the map */
      centerProperty: {
        latitude: 52,
        longitude: 13
      },

      /** the initial zoom level of the map */
      zoomProperty: 9,

      /** list of markers to put in the map */
      markersProperty: [ {
        // latitude: 45,
        // longitude: -74
      }],

    });
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