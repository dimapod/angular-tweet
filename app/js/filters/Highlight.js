'use strict';

twitterClientApp.filter('username', function() {
    return function(text) {
        if (!text) return text;
        text = parseUsername(text);
        return text;
    };
});

twitterClientApp.filter('hashtag', function() {
    return function(text) {
        if (!text) return text;
        text = parseHashtag(text);
        return text;
    };
});

function parseUsername(text) {
    return text.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/"+username);
    });
};

var START_TAG = "<span class='tag'>",
    END_TAG = "</span>";

function parseHashtag(text) {
    return text.replace(/ [#]+[A-Za-z0-9-_]+/g, function(t) {
        //var tag = t.replace("#","%23")
        return START_TAG + t + END_TAG;
    });
};