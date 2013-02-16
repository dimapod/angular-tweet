'use strict';

twitterClientApp.filter('inProgress', function() {
  var DOTS = {
    0: '',
    1: '.',
    2: '..',
    3: '...'
  }

  return function(dollarCount) {
    return DOTS[dollarCount % 4];
  };
});
