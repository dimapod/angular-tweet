'use strict';

var twitterClientApp = angular.module('twitterClientApp', ['ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/configuration.html',
                controller: 'ConfigurationCtrl'
            })
            .when('/wall', {
                templateUrl: 'partials/wall.html',
                controller: 'WallCtrl'
            })
            .when('/quick-search', {
                templateUrl: 'partials/quick-search.html',
                controller: 'WallCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
