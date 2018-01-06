'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.home',{
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController'
            }
        )
    });
