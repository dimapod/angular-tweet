'use strict';

twitterClientApp.directive('selectable', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var active = true;

            element.bind('click', toggle);

            function toggle() {
                active = !active;
                active ? element.addClass('active') :  element.removeClass('active');
            }

            toggle();
        }
    };

});
