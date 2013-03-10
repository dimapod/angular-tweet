'use strict';

twitterClientApp.factory('wallService', function (twitterService, configTweet, $timeout) {
    var timer;
    var frequency = configTweet.config.frequency;
    var searchTerm;

    var scope = {
        max_id_str: undefined,
        counter: 0,
        started: false,
        tweets: []
    }

    function search(_searchTerm) {
        searchTerm = _searchTerm;
        scope.max_id_str = undefined;
        scope.tweets.splice(0);

        twitterService.fetch(searchTerm, scope);
    }

    function startRefresh() {
        if (!scope.started) {
            timer = $timeout(onTimeout, frequency);
            scope.started = true;
        }
    }

    function stopRefresh() {
        $timeout.cancel(timer);
        scope.started = false;
    }

    function onTimeout() {
        scope.counter++;
        twitterService.fetch(searchTerm, scope);
        timer = $timeout(onTimeout, frequency);
    }

    // Public APIs
    return {
        search: search,
        start: startRefresh,
        stop: stopRefresh,
        info: scope
    };
});
