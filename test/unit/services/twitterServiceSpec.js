'use strict';

describe('twitterService.js', function(){
    var twitterService;

    beforeEach(function() {
        var receivedTweets = {
            results: [
                {
                    "created_at": "Sat, 09 Mar 2013 13:40:31 +0000",
                    "from_user": "Tabassum",
                    "from_user_id": 1011,
                    "from_user_name": "NAdEEMTabassum",
                    "id": 12,
                    "id_str": "1",
                    "text": "Necessitate prensando vertices ad discedunt."
                },
                {
                    "created_at": "Sat, 09 Mar 2013 13:39:31 +0000",
                    "from_user": "Evitandum",
                    "from_user_id": 2302,
                    "from_user_name": "Juan Sebastian *.*",
                    "id": 10,
                    "id_str": "2",
                    "text": "Quibusdam implicari esse nimis satis mirabilia esse beate non habitos."
                }
            ],
            max_id_str: "12"
        }

        var twitterResource = {
            query: function(value, fn) {
                console.log("twitterResourceMock.query");
                fn(receivedTweets);
            }
        };
        var configTweet = { config: { tweets_length: 3 } }

        module(function($provide) {
            $provide.value('twitterResource', twitterResource);
            $provide.value('configTweet', configTweet);
        });

        inject(function($injector) {
            twitterService = $injector.get('twitterService');
        });
    });

    it('should have twitterService defined', function() {
        var scope = { searchTerm: undefined, max_id_str: undefined, tweets:[{text:"tw2", id: 2},{text:"tw1", id: 1}] }
        twitterService.fetch(scope);

        expect(twitterService).toBeDefined();
    });

    it('should remove all tweets from scope.tweets when searchTerm is undefined', function() {
        var scope = { searchTerm: undefined, max_id_str: undefined, tweets:[{text:"tw2", id: 2},{text:"tw1", id: 1}] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(0);
    });

    it('should remove all tweets from scope.tweets when searchTerm is empty', function() {
        var scope = { searchTerm: "", max_id_str: undefined, tweets:[{text:"tw2", id: 2},{text:"tw1", id: 1}] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(0);
    });

    it('should fill empty scope.tweets with 2 new tweets', function() {
        var scope = { searchTerm: "angular", max_id_str: undefined, tweets:[] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(2);
        expect(scope.tweets[0].id).toBe(12);
        expect(scope.tweets[1].id).toBe(10);
    });

    it('should add 2 new tweets into scope.tweets having 1 tweet', function() {
        var scope = { searchTerm: "angular", max_id_str: undefined, tweets:[ {text:"existing tweet", id: 1} ] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(3);
        expect(scope.tweets[0].id).toBe(12);
        expect(scope.tweets[1].id).toBe(10);
        expect(scope.tweets[2].id).toBe(1);
    });

    it('should remove all extra tweets from scope.tweets (exceeding configTweet.config.tweets_length = 3)', function() {
        var scope = { searchTerm: "angular", max_id_str: undefined, tweets:[ {text:"tw3", id: 3}, {text:"tw2", id: 2}, {text:"tw1", id: 1} ] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(3);
        expect(scope.tweets[0].id).toBe(12);
        expect(scope.tweets[1].id).toBe(10);
        expect(scope.tweets[2].id).toBe(3);
    });

    it('should set scope.max_id_str to last received tweet id', function() {
        var scope = { searchTerm: "angular", max_id_str: undefined, tweets:[ {text:"tw3", id: 3}, {text:"tw2", id: 2}, {text:"tw1", id: 1} ] }
        twitterService.fetch(scope);

        expect(scope.max_id_str).toBeDefined();
        expect(scope.max_id_str).toBe('12');
    });

    it('should parse received data string in js Date', function() {
        var scope = { searchTerm: "angular", max_id_str: undefined, tweets:[] }
        twitterService.fetch(scope);

        expect(scope.tweets.length).toBe(2);
        expect(scope.tweets[0].date).toBe(1362836431000);
    });

});

