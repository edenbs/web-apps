angular.module('classify')
    .service('$managers', function ($resource) {
        return $resource('/api/managers/:id', {id: '@_id'}, {
            'update': {method: 'PUT'}
        })
    });