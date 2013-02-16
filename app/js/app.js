'use strict';

var twitterClientApp = angular.module('twitterClientApp', ['ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/wall.html',
                controller: 'TwitterCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
