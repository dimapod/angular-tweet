'use strict';

var twitterClientApp = angular.module('twitterClientApp', ['ngResource', 'ngSanitize'])
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
            .when('/help', {
                templateUrl: 'partials/help.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
