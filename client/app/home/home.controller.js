'use strict';

angular.module('classify').controller('HomeController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    var dataP = {lat: 31.969802, lng: 34.772795};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: dataP
    });
    var marker = new google.maps.Marker({
        position: dataP,
        map: map
    });
});