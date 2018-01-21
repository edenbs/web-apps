angular.module('classify')
    .service('$managers', function ($resource) {
        return $resource('/api/managers/:id', {}, {
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