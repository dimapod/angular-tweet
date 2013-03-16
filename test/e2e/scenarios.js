'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('e2e test suite', function () {

    describe('routes e2e', function () {

        describe('static routes', function () {
            // -> use iit(...) to execute only one given test
            //    use xit(...) to disable the given test
            it('verify static routes', function () {

                // -> use the fallowing command to pause e2e test
                // pause();

                browser().navigateTo('../../app/index.html#/configuration');
                expect(browser().location().url()).toBe('/configuration');

                browser().navigateTo('../../app/index.html#/help');
                expect(browser().location().url()).toBe('/help');
            });

            it('should redirect all other routes to /configuration', function () {
                browser().navigateTo('../../app/index.html');
                expect(browser().location().url()).toBe('/configuration');

                browser().navigateTo('../../app/index.html#/other-route');
                expect(browser().location().url()).toBe('/configuration');
            });

            it('should render configuration view', function () {
                browser().navigateTo('../../app/index.html#/configuration');
                expect(element('h4').html()).toBe('Twitter Wall Configuration');
            });

            it('should render help view', function () {
                browser().navigateTo('../../app/index.html#/help');
                expect(element('h4:first').html()).toBe('Help');
            });
        });

        describe('wall route', function () {

            beforeEach(function () {
                browser().navigateTo('../../app/index.html#/configuration');
                // TODO : delete all search params
            });

            it('should redirect /wall to /configuration when no search params are given', function () {
                browser().navigateTo('../../app/index.html#/wall');
                //expect(browser().location().url()).toBe('/configuration');
            });

            it('should render wall view when search params are given', function () {
                // TODO : add one search param

                browser().navigateTo('../../app/index.html#/wall');
                expect(element('h4:first').html()).toBe('Tweet Wall');
            });
        });
    });

    describe('menu navigation', function () {
        describe('menu configuration', function () {
            beforeEach(function () {
                browser().navigateTo('../../app/index.html#/help');
            });

            it('should go to configuration view', function () {
                element('#configuration a').click();
                expect(browser().location().url()).toBe('/configuration');
            });

            it('should add class .active to configuration menu item (li)', function () {
                expect(element('#configuration.active').count()).toBe(0);

                element('#configuration a').click();

                // expect .active class to be set only for configuration menu item
                expect(element('.active').count()).toBe(1);
                expect(element('#configuration.active').count()).toBe(1);
            });
        });

        describe('menu wall', function () {
            beforeEach(function () {
                browser().navigateTo('../../app/index.html#/configuration');
                // TODO add one search param
                browser().navigateTo('../../app/index.html#/help');
            });

            it('should go to wall view', function () {
                element('#wall a').click();
                expect(browser().location().url()).toBe('/wall');
            });

            it('should add class .active to configuration menu item (li)', function () {
                expect(element('#wall.active').count()).toBe(0);

                element('#wall a').click();

                // expect .active class to be set only for wall menu item
                expect(element('.active').count()).toBe(1);
                expect(element('#wall.active').count()).toBe(1);
            });
        });

        describe('menu help', function () {
            beforeEach(function () {
                browser().navigateTo('../../app/index.html#/configuration');
            });

            it('should go to help view', function () {
                element('#help a').click();
                expect(browser().location().url()).toBe('/help');
            });

            it('should add class .active to help menu item (li)', function () {
                expect(element('#help.active').count()).toBe(0);

                element('#help a').click();

                // expect .active class to be set only for help menu item
                expect(element('.active').count()).toBe(1);
                expect(element('#help.active').count()).toBe(1);
            });
        });
    });

});
