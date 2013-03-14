'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('routes', function () {

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

    describe('/wall', function () {

        it('should redirect /wall to /configuration when no search params are given', function () {
            browser().navigateTo('../../app/index.html#/configuration');
            // TODO : delete all search params

            browser().navigateTo('../../app/index.html#/wall');
            //expect(browser().location().url()).toBe('/configuration');
        });

        it('should render wall view when search params are given', function () {
            browser().navigateTo('../../app/index.html#/configuration');
            // TODO : add some search params

            browser().navigateTo('../../app/index.html#/wall');
            //expect(element('h4:first').html()).toBe('Tweet Wall');
        });
    });
});
