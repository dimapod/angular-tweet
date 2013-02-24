'use strict';

twitterClientApp.factory('wallService', function (twitterService, $rootScope, $timeout) {
    var self = this;
    var scope = undefined;
    var timer;
    var lastTweetId = undefined;
    var config = {tweets_length: 15, frequency: 1000};

    //self.started = false;
    self.info = {counter: 0, started: false};

    self.init = function (_scope) {
        scope = _scope;
        lastTweetId = undefined;
        self.refresh();
    }

    self.refresh = function () {
        if (!scope.searchTerm) {
            scope.tweets.splice(0);
            return;
        }

        var params = {q: scope.searchTerm, since_id: lastTweetId};
        twitterService.query(params,
            function (tweets) {
                if (tweets.results && tweets.results.length) {
                    putNewElements(tweets.results);
                    lastTweetId = scope.tweets[0].id;
                }
            });
    };

    function putNewElements(newTweets) {
        angular.forEach(newTweets.slice(0).reverse(), function (newTweet) {
            if (newTweet.id != lastTweetId) {
                scope.tweets.unshift(newTweet);
            }
        });
        scope.tweets.splice(config.tweets_length);
    };

    // Auto refresh

    self.startRefresh = function () {
        if (!self.info.started) {
            timer = $timeout(onTimeout, config.frequency);
            self.info.started = true;
        }
    };

    self.stopRefresh = function () {
        if (self.info.started) {
            $timeout.cancel(timer);
            self.info.started = false;
        }
    };

    function onTimeout() {
        self.info.counter++;
        self.refresh();
        timer = $timeout(onTimeout, config.frequency);
    }

    // Public APIs
    return {
        init: self.init,
        start: self.startRefresh,
        stop: self.stopRefresh,
        info: self.info
    };
});
