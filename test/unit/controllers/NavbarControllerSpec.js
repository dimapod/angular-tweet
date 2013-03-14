'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('NavbarController.js', function(){
    var $scope;

    beforeEach(function() {
        // $location service mock
        var $location = {
            path: function() { return "/path" }
        }

        // ConfigTweet mock
        var configTweet = { config: { frequency: 1000, params:[ {type : 'hash', value: 'test'} ] } }

        inject(function($injector, $controller, $rootScope) {
            $controller('NavbarCtrl', {$scope: $scope = $rootScope.$new(), $location: $location, configTweet: configTweet});
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('should set $scope.confParams from configTweet.config.params', function() {
        expect($scope.confParams).toEqual([ {type : 'hash', value: 'test'} ]);
    });

    it('should have routeIs() method defined', function() {
        expect($scope.routeIs).toBeDefined();
    });

    it('should verify actual path', function() {
        expect($scope.routeIs('/path')).toBeTruthy();
        expect($scope.routeIs('/strange')).toBeFalsy();
    });

});

