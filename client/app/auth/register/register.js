'use strict';

angular.module('classify')
    .config(function ($stateProvider) {

        $stateProvider.state('register',{
            url:'/register',
            templateUrl:'app/auth/register/register.html',
            controller:'RegisterController'
        })
    });