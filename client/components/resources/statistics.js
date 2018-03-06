'use strict';

angular.module('classify')
    .service('$stats', function($resource) {
        return $resource('/api/statistics/', {}, {
            avgGradeInClass: {method: 'GET', isArray: true, url: '/api/statistics/avgGradeInClass'},
            numInClass: {method: 'GET', isArray:true, url: 'api/statistics/numInClass'}
        })
    });
