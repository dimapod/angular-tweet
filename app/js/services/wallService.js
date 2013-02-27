'use strict';

twitterClientApp.factory('wallService', function (twitterResource, $rootScope, $timeout) {
    var self = this;
    var timer;

    var scope = $rootScope.$new();
    scope.lastTweetId = undefined;
    scope.config = {tweets_length: 15, frequency: 1000};
    scope.data = {counter: 0, started: false, tweets: [] };

    self.search = function (_searchTerm) {
        scope.searchTerm = _searchTerm;
        scope.lastTweetId = undefined;
        scope.data.tweets.splice(0);

        self.fetch();
    }

    self.fetch = function () {
        if (!scope.searchTerm) {
            scope.data.tweets.splice(0);
            return;
        }

        twitterResource.query(
            {q: scope.searchTerm, since_id: scope.lastTweetId},
            function (tweets) {
                if (tweets.results && tweets.results.length) {
                    self.putNewElements(tweets.results);
                    scope.lastTweetId = tweets.max_id;
                }
            });
    };

    self.putNewElements = function (newTweets) {
        angular.forEach(newTweets.slice(0).reverse(), function (newTweet) {
            if (newTweet.id != scope.lastTweetId) {
                newTweet.date = Date.parse(newTweet.created_at);
                scope.data.tweets.unshift(newTweet);
            }
        });
        scope.data.tweets.splice(scope.config.tweets_length);
    };

    self.startRefresh = function () {
        if (!scope.data.started) {
            timer = $timeout(onTimeout, scope.config.frequency);
            scope.data.started = true;
        }
    };

    self.stopRefresh = function () {
        if (scope.data.started) {
            $timeout.cancel(timer);
            scope.data.started = false;
        }
    };

    function onTimeout() {
        scope.data.counter++;
        self.fetch();
        timer = $timeout(onTimeout, scope.config.frequency);
    }

    // Public APIs
    return {
        search: self.search,
        start: self.startRefresh,
        stop: self.stopRefresh,
        info: scope.data
    };
});
