'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('login',{
            url:'/login',
            templateUrl:'app/auth/login/login.html',
            controller:'LoginController',
            data: {
                loginNotRequired: true,
                loggedInForbidden: true
            }
        })
    });