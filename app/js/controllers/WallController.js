'use strict';

twitterClientApp.controller('WallCtrl', function ($scope, twitterService, wallService) {

    $scope.searchTerm = "angularjs"
    $scope.tweets = [];

    wallService.init($scope);
    wallService.start();

    $scope.wall = wallService.info;

    $scope.startRefresh = function () {
        wallService.start();
    };

    $scope.stopRefresh = function () {
        wallService.stop();
    };

    $scope.startWall = function () {
        //$scope.lastTweetId = undefined;
        $scope.tweets.splice(0);
        $scope.searchTerm = $scope.search;
        wallService.refresh();
    };

});
