'use strict';

twitterClientApp.controller('ConfigurationCtrl',
    function ConfigurationCtrl(localStorage, $scope, $location) {

        if(localStorage['form']) {
            $scope.params = JSON.parse(localStorage['form']);
        } else {
            $scope.params = [];
        }

        $scope.displayForm = false;

        $scope.hashTag = "";

        $scope.toggleTweetInfo = function() {
            $scope.displayForm = !$scope.displayForm;
        }

        $scope.addHashTag = function() {
            $scope.params.push({
                type: 'hash',
                value:$scope.hashTag});
            $scope.hashTag = "";
            localStorage['form'] = JSON.stringify($scope.params);
        }

        $scope.removeHashTag = function(index){
            $scope.params.splice(index, 1);
            localStorage['form'] = JSON.stringify($scope.params);
        }

    });
