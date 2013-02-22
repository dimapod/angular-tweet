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

var START_TAG = "<span class='hashtag'>",
    END_TAG = "</span>";
var HASHTAG_REGEXP = /\s([#]+[A-Za-z0-9-_]+)/

function parseHashtag(text) {
    if (!text) return text;
    var match;
    var tag;
    var raw = text;

    var i;
    var rez = "";

    while ((match = raw.match(HASHTAG_REGEXP))) {
        tag = match[1];
        i = match.index + 1;
        rez += raw.substr(0, i) + START_TAG + tag + END_TAG;
        raw = raw.substring(i + tag.length);
    }
    rez += raw;
    return rez;
};

function parseHashtag_pb(text) {
    return text.replace(/\s([#]+[A-Za-z0-9-_]+)/g, function(t) {
        //var tag = t.replace("#","%23")
        return START_TAG + t + END_TAG;
    });
};