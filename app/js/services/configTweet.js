'use strict';

twitterClientApp.factory('configTweet', function (localStorage) {

    var localStorageKey = 'configTweet'

    function loadTweetConfig() {
        var params = localStorage[localStorageKey];
        return params ? JSON.parse(params) : [];
    };

    function saveTweetConfig(data) {
        var dataStore = loadTweetConfig();
        dataStore.push({
            type: 'hash',
            value: data});
        localStorage[localStorageKey] = JSON.stringify(dataStore);
        return dataStore;
    };

    function removeHashTag(index) {
        var dataStore = loadTweetConfig();
        dataStore.splice(index, 1);
        localStorage[localStorageKey] = JSON.stringify(dataStore);
        return dataStore;
    }

    // public api
    return {
        loadTweetConfig: loadTweetConfig,
        saveTweetConfig: saveTweetConfig,
        removeHashTag: removeHashTag
    };

});