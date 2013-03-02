'use strict';

twitterClientApp.factory('twitterService', function (twitterResource) {
    var self = this;

    // TODO: inject from configuration
    self.config = {tweets_length: 15, frequency: 1000};

    self.fetch = function (scope) {
        if (!scope.searchTerm) {
            scope.tweets.splice(0);
            return;
        }

        twitterResource.query(
            {q: scope.searchTerm, since_id: scope.max_id_str, include_entities: true},
            function (tweets) {
                if (tweets.results && tweets.results.length) {
                    angular.forEach(tweets.results.reverse(), function (tweet) {
                        tweet.date = Date.parse(tweet.created_at);
                        scope.tweets.unshift(tweet);
                    });
                    scope.tweets.splice(self.config.tweets_length);
                    scope.max_id_str = tweets.max_id_str;
                }
            });
    };

    // Public APIs
    return {
        fetch: self.fetch
    };
});
