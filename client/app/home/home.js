'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.home',{
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                resolve: {
                    schools: function($schools) {
                        return $schools.get().$promise;
                    }
                }
            }
        )
    });
