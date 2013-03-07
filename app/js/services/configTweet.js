'use strict';

twitterClientApp.factory('configTweet', function ($rootScope) {
    var LOCAL_STORAGE_ID = 'configuration',
        configStr = localStorage[LOCAL_STORAGE_ID];

    var configInitial = {
        frequency: 10000,
        tweets_length: 15,
        params: []
    }

    var configuration = configStr ? JSON.parse(configStr) : configInitial;

    function addParam(data) {
        configuration.params.push({ type: 'hash', value: data });
    }

    function removeParam(index) {
        configuration.params.splice(index, 1);
    }

    $rootScope.$watch(function () {
        return configuration;
    }, function () {
        save();
    }, true);

    function save() {
        localStorage[LOCAL_STORAGE_ID] = JSON.stringify(configuration);
    }


//    var localStorageKey = 'configTweet'
//
//    function loadTweetConfig() {
//        var params = localStorage[localStorageKey];
//        return params ? JSON.parse(params) : [];
//    };
//
//    function saveTweetConfig(data) {
//        var dataStore = loadTweetConfig();
//        dataStore.push({
//            type: 'hash',
//            value: data});
//        localStorage[localStorageKey] = JSON.stringify(dataStore);
//        return dataStore;
//    };
//
//    function removeHashTag(index) {
//        var dataStore = loadTweetConfig();
//        dataStore.splice(index, 1);
//        localStorage[localStorageKey] = JSON.stringify(dataStore);
//        return dataStore;
//    }
//
//    // public api
//    return {
//        loadTweetConfig: loadTweetConfig,
//        saveTweetConfig: saveTweetConfig,
//        removeHashTag: removeHashTag
//    };

    return {
        config: configuration,
        addParam: addParam,
        removeParam: removeParam
    };

});