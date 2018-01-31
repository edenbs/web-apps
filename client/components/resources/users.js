'use strict';

angular.module('classify')
    .service('$users', function ($resource) {
        return $resource('/api/users/:id', {id: '@_id'}, {
            'me': { method: 'GET', params: { id: 'me' } }
        });
    });