'use strict';

angular.module('classify')
    .controller('ToolbarController', function ($scope, $mdSidenav, $mdComponentRegistry, $window) {
        $scope.isNavIconOpened = false;

        $scope.$watch(function () {
                    return $mdComponentRegistry.get('sideNav') ? $mdSidenav('sideNav').isOpen() : false;
                },
                function (newVal) {
                    $scope.isNavIconOpened = newVal;
                });

        $scope.toggleMenu = function () {
            $mdSidenav('sideNav').toggle();
        };
        
        function convertToC(temp) {
            return (parseFloat(temp) - 32) * (5 / 9);
        }

        $.get("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%2Citem.condition.temp%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22gan%20yavne%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data) {
            $('#weather .temp').text(Math.ceil(convertToC(data.query.results.channel.item.condition.temp)) + '° ' + data.query.results.channel.item.condition.text);
        });

        // Load Facebook SDK for JavaScript
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $window.fbAsyncInit = function() {
            FB.init({
                appId: '192249178206425',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.12'
            });
        };

        $scope.share = function () {
            FB.ui({
                method: 'share',
                display: 'popup',
                quote: 'Hey, check me out on http://classify.com!',
                href: 'http://classify.com'
            }, function (response) { console.log(response)},
            function(err) { console.log(err) });
        }
    });
