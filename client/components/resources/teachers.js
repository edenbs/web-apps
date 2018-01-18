angular.module('classify')
    .service('$teachers', function ($resource) {
       return $resource('/api/teachers/:id', {id: '@_id'}, {
           'update': {method: 'PUT'}
       })
    });
