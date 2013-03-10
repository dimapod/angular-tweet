'use strict';

twitterClientApp.factory('twitterService', function (twitterResource, configTweet) {
    var tweets_length = configTweet.config.tweets_length;

    function fetch(searchTerm, scope) {
        if (!searchTerm) {
            scope.tweets.splice(0);
            return;
        }

        twitterResource.query(
            {q: searchTerm, since_id: scope.max_id_str, include_entities: true},
            function (tweets) {
                if (tweets.results && tweets.results.length) {
                    angular.forEach(tweets.results.reverse(), function (tweet) {
                        tweet.date = Date.parse(tweet.created_at);
                        scope.tweets.unshift(tweet);
                    });
                    scope.tweets.splice(tweets_length);
                    scope.max_id_str = tweets.max_id_str;
                }
            });
    };

    // Public APIs
    return {
        fetch: fetch
    };
});
