'use strict';

twitterClientApp.controller('ConfigurationCtrl',
    function ConfigurationCtrl($scope, configTweet) {

        $scope.params = configTweet.loadTweetConfig();

        $scope.displayForm = false;
        $scope.hashTag = "";

        $scope.toggleTweetInfo = function () {
            $scope.displayForm = !$scope.displayForm;
        };

        $scope.addHashTag = function () {
            $scope.params = configTweet.saveTweetConfig($scope.hashTag);
            $scope.hashTag = "";
        };

        $scope.removeHashTag = function (index) {
            $scope.params = configTweet.removeHashTag(index);
        };

    });
