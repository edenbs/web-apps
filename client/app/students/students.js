'use strict';

angular.module('classify')
    .config(function ($stateProvider) {

        $stateProvider.state('shell.students',{
                url: '/students',
                templateUrl: 'app/students/students.html',
                controller: 'StudentsController',
                resolve: {
                    students: function($students) {
                        return $students.paginate().$promise;
                    }
                },
                data: {
                    requiredRole: ['manager', 'editor', 'viewer']
                }
            })
         });
