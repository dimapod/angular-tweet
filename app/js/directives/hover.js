'use strict';

twitterClientApp.directive('hover', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            element.bind('mouseover', onMouseOver);
            element.bind('mouseout', onMouseOut);

            function onMouseOver() {
                element.addClass('active');
            }
            function onMouseOut() {
                element.removeClass('active');
            }
        }
    };

});
