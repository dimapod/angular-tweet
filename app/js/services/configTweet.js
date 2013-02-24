'use strict';

twitterClientApp.factory('configTweet', function (localStorage) {

    return {
        loadTweetConfig: function() {
            var params = localStorage['form'];
            return params ? JSON.parse(params) : [];
        },

        saveTweetConfig: function(data) {
             localStorage['form'] = JSON.stringify(data);
        }
    };

});