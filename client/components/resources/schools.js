angular.module('classify')
    .service('$schools', function($resource) {
       return $resource('/api/schools/:id', {}, {
           get: {method: 'GET', isArray: true}
       })
    });
