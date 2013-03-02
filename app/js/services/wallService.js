'use strict';

twitterClientApp.factory('wallService', function (twitterService, $rootScope, $timeout) {
    var self = this;
    var timer;

    // TODO: inject from configuration
    var config = {tweets_length: 15, frequency: 1000};

    var scope = {};
    scope.max_id_str = undefined;
    scope.counter = 0;
    scope.started = false;
    scope.tweets = [];

    self.search = function (searchTerm) {
        scope.searchTerm = searchTerm;
        scope.max_id_str = undefined;
        scope.tweets.splice(0);

        twitterService.fetch(scope);
    }

    self.startRefresh = function () {
        if (!scope.started) {
            timer = $timeout(onTimeout, config.frequency);
            scope.started = true;
        }
    };

    self.stopRefresh = function () {
        if (scope.started) {
            $timeout.cancel(timer);
            scope.started = false;
        }
    };

    function onTimeout() {
        scope.counter++;
        twitterService.fetch(scope);
        timer = $timeout(onTimeout, config.frequency);
    }

    // Public APIs
    return {
        search: self.search,
        start: self.startRefresh,
        stop: self.stopRefresh,
        info: scope
    };
});
