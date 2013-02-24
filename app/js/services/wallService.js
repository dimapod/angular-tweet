'use strict';

twitterClientApp.factory('wallService', function (twitterService, $rootScope, $timeout) {
    var self = this;
    var timer;
    var lastTweetId = undefined;
    var searchTerm = undefined;

    var config = {tweets_length: 15, frequency: 1000};

    self.info = {counter: 0, started: false, tweets: []};

    self.search = function (_searchTerm) {
        searchTerm = _searchTerm;
        lastTweetId = undefined;
        self.info.tweets.splice(0);
        self.refresh();
    }

    self.refresh = function () {
        if (!searchTerm) {
            self.info.tweets.splice(0);
            return;
        }

        twitterService.query(
            {q: searchTerm, since_id: lastTweetId},
            function (tweets) {
                if (tweets.results && tweets.results.length) {
                    self.putNewElements(tweets.results);
                    lastTweetId = self.info.tweets[0].id;
                }
            });
    };

    self.putNewElements = function (newTweets) {
        angular.forEach(newTweets.slice(0).reverse(), function (newTweet) {
            if (newTweet.id != lastTweetId) {
                self.info.tweets.unshift(newTweet);
            }
        });
        self.info.tweets.splice(config.tweets_length);
    };

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
        search: self.search,
        start: self.startRefresh,
        stop: self.stopRefresh,
        info: self.info
    };
});
