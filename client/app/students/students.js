'use strict';

angular.module('classify')
    .config(function ($stateProvider) {

        $stateProvider.state('shell.students',{
                url: '/students',
                templateUrl: 'app/students/students.html',
                controller: 'StudentsController'
            })
         });
