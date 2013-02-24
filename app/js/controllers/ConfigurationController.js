'use strict';

twitterClientApp.controller('ConfigurationCtrl',
    function ConfigurationCtrl($scope, configTweet) {

        $scope.params = configTweet.loadTweetConfig();

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
            configTweet.saveTweetConfig($scope.params);
        };

        $scope.removeHashTag = function(index){
            $scope.params.splice(index, 1);
            configTweet.saveTweetConfig($scope.params);
        };

    });
