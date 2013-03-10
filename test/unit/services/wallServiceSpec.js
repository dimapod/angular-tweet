'use strict';

// -> use ddescribe(...) to execute only one given test suite
// -> use xdescribe(...) to disable given test suite
describe('twitterService.js', function(){
    var wallService, $timeout;
    var twitterService;

    beforeEach(function() {
        // TwitterService mock
        twitterService = {
            fetch: function() {
            }
        };

        spyOn(twitterService, 'fetch') // mocks the call to twitterService.fetch() => do nothing

        // ConfigTweet mock
        var configTweet = { config: { frequency: 1000 } }

        module(function($provide) {
            $provide.value('twitterService', twitterService);
            $provide.value('configTweet', configTweet);
        });

        inject(function($injector, _$timeout_) {
            wallService = $injector.get('wallService');
            $timeout = _$timeout_;
        });
    });

    // -> use iit(...) to execute only one given test
    // -> use xit(...) to disable the given test
    it('should have wallService to be defined', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools
        // debugger;

        expect(wallService).toBeDefined();
    });

    it('should have public functions wallService[search(), start(), stop()] to be defined', function() {
        expect(wallService.search).toBeDefined();
        expect(wallService.start).toBeDefined();
        expect(wallService.stop).toBeDefined();
    });

    it('should have default data in public field wallService.info', function() {
        expect(wallService.info).toBeDefined();
        expect(wallService.info).toEqual({ max_id_str: undefined, counter: 0, started: false, tweets: [] });
    });

    it('should reset scope and call twitterService.fetch()', function() {
        // Prepare data
        wallService.info.max_id_str = "120";
        wallService.info.tweets = [{}, {}];

        // Tested call
        wallService.search("angular");

        // Asserts
        expect(wallService.info.max_id_str).toBeUndefined();
        expect(wallService.info.tweets.length).toBe(0);
        expect(twitterService.fetch).toHaveBeenCalledWith("angular", { max_id_str: undefined, counter: 0, started: false, tweets: [] });
    });

    it('wallService.start() should create a timer that calls periodically twitterService.fetch()', function() {
        // todo: get search term from config
        wallService.search("angular");

        // Tested call
        wallService.start();

        // Flush timeout
        $timeout.flush();
        expect(twitterService.fetch.calls.length).toEqual(2);
        expect(twitterService.fetch).toHaveBeenCalledWith("angular", { max_id_str: undefined, counter: 1, started: true, tweets: [] });

        // Flush timeout
        $timeout.flush();
        expect(twitterService.fetch.calls.length).toEqual(3);
        expect(twitterService.fetch).toHaveBeenCalledWith("angular", { max_id_str: undefined, counter: 2, started: true, tweets: [] });
    });

    it('wallService.stop() should stop timer', function() {
        // todo: get search term from config
        wallService.search("angular");

        wallService.start();

        // Flush timeout
        $timeout.flush();
        expect(twitterService.fetch.calls.length).toEqual(2);
        expect(twitterService.fetch).toHaveBeenCalledWith("angular", { max_id_str: undefined, counter: 1, started: true, tweets: [] });

        // Tested call
        wallService.stop();

        // Try to flush timeout
        try {
            $timeout.flush();
        } catch(err) {
            expect(err.message).toEqual("No deferred tasks to be flushed");
            expect(twitterService.fetch.calls.length).toEqual(2);
        }
    });

});

