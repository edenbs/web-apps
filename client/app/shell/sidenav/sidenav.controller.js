'use strict';

angular.module('classify')
    .controller('SidenavController', function ($scope, $rootScope, $mdSidenav, $mdDialog, $state, auth) {

        $scope.logout = function () {
           var mess = auth.logout();
        };

        // Getting the current user json object
       var loggedInUser =  auth.getCurrentUser();

        $scope.loginMessage = "Hello! " + loggedInUser.firstName +  "  " +loggedInUser.lastName;
         $scope.menuList = [{
            text: 'Home',
            state: 'shell.home',
            iconClass: 'home'
        },{
            text: 'Teachers',
            state: 'shell.teachers',
            iconClass: 'users'
        },{
            text: 'Students',
            state: 'shell.students',
            iconClass: 'students'
        }];

        $scope.toggleMenu = function () {
            $mdSidenav('sideNav').toggle();
        }
    });
