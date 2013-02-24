'use strict';

twitterClientApp.controller('WallCtrl', function ($scope, twitterService, wallService) {
    $scope.searchForm = "";
    $scope.searchTerm = "angularjs";

    wallService.search($scope.searchTerm);
    wallService.start();

    $scope.wall = wallService;

    $scope.startWall = function () {
        $scope.searchTerm = $scope.searchForm;
        wallService.search($scope.searchTerm);
    };
});
