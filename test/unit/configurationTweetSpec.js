'use strict';

/* jasmine specs for services go here */

describe('configTweet', function(){
    var configTweet, localStorage;

    beforeEach(module(function($provide) {

        localStorage = {
            configTweet: undefined
        };
        $provide.value('localStorage', localStorage);
    }));

    beforeEach(function() {

        inject(function($injector) {
            configTweet = $injector.get('configTweet');
        });
    });

    it('should load empty array when localstorage is empty', function() {

        var data = configTweet.loadTweetConfig();
        expect(data).toEqual([]);
    });

    it('should save data into locastorage', function() {

        configTweet.saveTweetConfig('testSave');
        var data = configTweet.loadTweetConfig();
        expect(data).toEqual([{type : 'hash', value: 'testSave'}]);
    });

    it('should remove data from locastorage', function() {

        configTweet.saveTweetConfig('testSave');
        var data = configTweet.loadTweetConfig();
        expect(data).toEqual([{type : 'hash', value: 'testSave'}]);
    });
});

