'use strict';

angular.module('classify').controller('HomeController', function($scope, schools) {
    function initMap() {
        try{
            var dataP = {lat: 31.969802, lng: 34.772795};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: dataP
            });

            var markers =_.map(schools, school => {
                return new google.maps.Marker({
                    position: {
                        lat: school.location.lat,
                        lng: school.location.lng
                    },
                    map: map
                })
            });
        } catch (err){
        }
    }

    initMap();
});