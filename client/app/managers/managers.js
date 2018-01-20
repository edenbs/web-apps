'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.managers',{
            url: '/managers',
            templateUrl:'app/managers/managers.html',
            controller: 'ManagersController',
            resolve: {
                managers: function($managers) {
                    return $managers.query().$promise;
                }
            }
        })
    });

