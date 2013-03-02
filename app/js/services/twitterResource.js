'use strict';

twitterClientApp.factory('twitterResource', function ($resource) {

    return $resource('http://search.twitter.com/search.json',
        { callback: 'JSON_CALLBACK' },
        { query: {method: 'JSONP'} }
    );

});
