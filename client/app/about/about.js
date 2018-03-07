/**
 * Created by danatsirulnik on 03/03/2018.
 */
'use strict';

angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.about',{
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutController'
            }
        )
    });
