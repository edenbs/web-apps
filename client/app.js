'use strict';

angular.module('classify', ["ui.router", "ngMaterial","angular-hamburglar","md.data.table","fixed.table.header"])
    .config(function($stateProvider,$locationProvider,$urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');
        $stateProvider.state('login',{
            url:'/',
            templateUrl:'app/auth/login/login.html',
            controller:'LoginController'
        })
    });

