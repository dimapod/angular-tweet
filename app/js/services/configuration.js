'use strict';

twitterClientApp.factory('configuration', function ($rootScope, localStorage) {

    var LOCAL_STORAGE_ID = 'configuration',
        customerString = localStorage[LOCAL_STORAGE_ID];

    var configuration = customerString ? JSON.parse(customerString) : {
        params: []
    };

    $rootScope.$watch(function () {
        return configuration;
    }, function () {
        localStorage[LOCAL_STORAGE_ID] = JSON.stringify(configuration);
    }, true);

    return configuration;
});