'use strict';

describe('In-progress filter', function () {

    it('should have a in-progress filter', inject(function($filter) {
        expect($filter('inProgress')).toBeDefined();
    }));

    it('should return undefined when nothing is set', inject(function (inProgressFilter) {
        expect(inProgressFilter()).toBeUndefined();
    }));

    it('should return undefined when nothing is set', inject(function (inProgressFilter) {
        expect(inProgressFilter("string")).toBeUndefined();
    }));

    it('should show proper number of points', inject(function (inProgressFilter) {
        expect(inProgressFilter(0)).toBe('');
        expect(inProgressFilter(1)).toBe('.');
        expect(inProgressFilter(3)).toBe('...');
    }));

});
