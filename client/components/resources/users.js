'use strict';

angular.module('classify')
    .service('$users', function ($resource) {
        return $resource('/api/users/:id', {id: '@_id'}, {
            'me': { method: 'GET', params: { id: 'me' } },
            'mySubjects' : {method: 'GET', url: '/api/users/my-subjects', isArray: true}
        });
    });