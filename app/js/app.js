'use strict';

var twitterClientApp = angular.module('twitterClientApp', ['ngResource', 'ngSanitize'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/configuration', {
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
                redirectTo: '/configuration'
            });
    }])
    .run(function($rootScope, $location, configTweet) {
        $rootScope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
            if (configTweet.config.params.length == 0 && newValue == '/wall') {
                $location.url('/configuration');
            }
        });
    });


