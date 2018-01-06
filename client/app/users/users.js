'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.users',{
            url: '/users',
            templateUrl:'app/users/users.html',
            controller: 'UsersController'
        })
    });

