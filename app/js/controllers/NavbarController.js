'use strict';

twitterClientApp.controller('NavbarCtrl',
    function NavbarController($scope, $location, configTweet) {

        $scope.confParams = configTweet.config.params;

        $scope.routeIs = function (routeName) {
            return $location.path() === routeName;
        };

    });
