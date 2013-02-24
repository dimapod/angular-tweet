'use strict';

twitterClientApp.controller('NavbarCtrl',
    function NavbarController($scope, $location, configuration) {

        $scope.$watch(function () {
            return configuration.params.length;
        }, function() {
            $scope.confDone = configuration.params.length != 0;
        });

        $scope.routeIs = function (routeName) {
            return $location.path() === routeName;
        };


        $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
            if ((configuration.params == undefined || configuration.params.length == 0) && newValue == '/wall'){
                $location.url('/configuration');
            }
        });

    });
