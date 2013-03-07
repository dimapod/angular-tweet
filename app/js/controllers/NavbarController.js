'use strict';

twitterClientApp.controller('NavbarCtrl',
    function NavbarController($scope, $location, configTweet) {

        $scope.confParams = configTweet.config.params;

        $scope.routeIs = function (routeName) {
            return $location.path() === routeName;
        };

        $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
            if ($scope.confParams.length == 0 && newValue == '/wall') {
                $location.url('/configuration');
            }
        });

    });
