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
