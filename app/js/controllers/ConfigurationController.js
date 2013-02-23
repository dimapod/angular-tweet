'use strict';

twitterClientApp.controller('ConfigurationCtrl',
    function ConfigurationCtrl(localStorage, $scope, configuration) {

        $scope.params = configuration.params;

        $scope.displayForm = false;

        $scope.hashTag = "";

        $scope.toggleTweetInfo = function() {
            $scope.displayForm = !$scope.displayForm;
        };

        $scope.addHashTag = function() {
            $scope.params.push({
                type: 'hash',
                value:$scope.hashTag});
            $scope.hashTag = "";
        };

        $scope.removeHashTag = function(index){
            $scope.params.splice(index, 1);
        };

    });
