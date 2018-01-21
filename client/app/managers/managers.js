'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.managers',{
            url: '/managers',
            templateUrl:'app/managers/managers.html',
            controller: 'ManagersController',
            data: {
                requiredRole: 'admin'
            },
            resolve: {
                managers: function($managers) {
                    return $managers.paginate().$promise;
                },
                schools: function($schools) {
                    return $schools.query().$promise;
                }
            }
        })
    });

