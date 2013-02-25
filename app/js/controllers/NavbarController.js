'use strict';

twitterClientApp.controller('NavbarCtrl',
    function NavbarController($scope, $location, configuration) {

        $scope.confParams = configuration.params;

        $scope.routeIs = function (routeName) {
            return $location.path() === routeName;
        };

        $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue) {
            if ((configuration.params == undefined || configuration.params.length == 0) && newValue == '/wall'){
                $location.url('/configuration');
            }
        });

    });
