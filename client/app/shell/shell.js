'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider
            .state('shell', {
                abstract: true,
                templateUrl: 'app/shell/shell.html',
                resolve: {
                    user: function ($resource) {
                        return true;
                    }
                }
            });
    });
