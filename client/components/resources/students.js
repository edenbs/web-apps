angular.module('classify')
    .service('$students', function($resource) {
        return $resource('/api/students/:id', {}, {
            'paginate': {
                method: 'GET',
                params: {
                    sort: 'name.first',
                    limit: 5,
                    page: 1
                }
            },
            'update': {method: 'PUT', params: {id: '@_id'}},
            'delete': {method: 'DELETE', params: {id: '@_id'}},
            'grades': {method: 'GET', url: '/api/students/:id/grades', isArray: true},
            'addGrade': {method: 'POST', url: '/api/students/:id/grades'},
            'updateGrade': {method: 'PUT', url: '/api/students/:id/grades/:grade'},
            'deleteGrade': {method: 'DELETE', url: '/api/students/:id/grades/:grade'}
        })
    });
