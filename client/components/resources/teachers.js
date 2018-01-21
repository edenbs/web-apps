angular.module('classify')
    .service('$teachers', function ($resource) {
       return $resource('/api/teachers/:id', {}, {
           'paginate': {
               method: 'GET',
               params: {
                   sort: 'name.first',
                   limit: 5,
                   page: 1
               }
           },
           'update': {method: 'PUT', params: {id: '@_id'}},
           'delete': {method: 'DELETE', params: {id: '@_id'}}
       })
    });
