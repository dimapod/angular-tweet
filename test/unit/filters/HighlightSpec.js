'use strict';

describe('Highlight filters', function () {

    describe('Username filter', function () {

        it('should have a username filter', inject(function ($filter) {
            expect($filter('username')).toBeDefined();
        }));

        it('should not change a tweet when no username tags', inject(function (usernameFilter) {
            expect(usernameFilter('just a tweet')).toBe('just a tweet');
        }));

        it('should add a link to a username tag', inject(function (usernameFilter) {
            expect(usernameFilter('a tweet from @angularjs'))
                .toBe('a tweet from <a href="http://twitter.com/angularjs">@angularjs</a>');
        }));

        it('should add multiples links to username tags', inject(function (usernameFilter) {
            expect(usernameFilter('RT @larry: @angularjs is awesome'))
                .toBe('RT <a href="http://twitter.com/larry">@larry</a>: <a href="http://twitter.com/angularjs">@angularjs</a> is awesome');
        }));
    });

    describe('Hashtag filter', function () {

        it('should have a hashtag filter', inject(function ($filter) {
            expect($filter('hashtag')).toBeDefined();
        }));

        it('should not change a tweet when no hashtag tags', inject(function (hashtagFilter) {
            expect(hashtagFilter('another tweet')).toBe('another tweet');
        }));

        it('should add a span to a hashtag tag', inject(function (hashtagFilter) {
            expect(hashtagFilter('a tweet from #angularjs'))
                .toBe("a tweet from <span class='hashtag'>#angularjs</span>");
        }));

        it('should add multiples spans to hashtag tags', inject(function (hashtagFilter) {
            expect(hashtagFilter('RT #LyonJS ce soir avec #AngularJS'))
                .toBe("RT <span class='hashtag'>#LyonJS</span> ce soir avec <span class='hashtag'>#AngularJS</span>");
        }));

        it('should not change encoded characters', inject(function (hashtagFilter) {
            expect(hashtagFilter('RT cr&#233;dito'))
                .toBe("RT cr&#233;dito");
        }));
    });

});
