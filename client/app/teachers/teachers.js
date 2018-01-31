'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.teachers',{
            url: '/teachers',
            templateUrl:'app/teachers/teachers.html',
            controller: 'TeachersController',
            data: {
                requiredRole: ['manager']
            },
            resolve: {
                teachers: function($teachers) {
                    return $teachers.paginate().$promise;
                }
            }
        })
    });

