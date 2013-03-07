'use strict';

twitterClientApp.controller('ConfigurationCtrl',
    function ConfigurationCtrl($scope, configTweet) {

        $scope.params = configTweet.config.params;

        $scope.displayForm = false;
        $scope.hashTag = "";

        $scope.toggleTweetInfo = function () {
            $scope.displayForm = !$scope.displayForm;
        };

        $scope.addHashTag = function () {
            configTweet.addParam($scope.hashTag);
            $scope.hashTag = "";
        };

        $scope.removeHashTag = function (index) {
            configTweet.removeParam(index);
        };

    });
