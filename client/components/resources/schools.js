angular.module('classify')
    .service('$schools', function($resource) {
       return $resource('/api/schools/:id', {})
    });
