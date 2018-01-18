'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.teachers',{
            url: '/teachers',
            templateUrl:'app/teachers/teachers.html',
            controller: 'TeachersController',
            resolve: {
                teachers: function($teachers) {
                    return $teachers.query().$promise;
                }
            }
        })
    });

