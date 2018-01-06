'use strict';

angular.module('classify')
    .controller('SidenavController', function ($scope, $rootScope, $mdSidenav, $mdDialog,  $state, $auth) {

        $scope.logout = function () {
           var mess = $auth.logout();
        };

        // getting the current user json object
       var loggedInUser =  $auth.currentUser().$$state.value;

        $scope.loginMessage = "Hello! " + loggedInUser.firstName +  "  " +loggedInUser.lastName;
         $scope.menuList = [{
            text: 'Home',
            state: 'shell.home',
            iconClass: 'home'
        },{
            text: 'Users',
            state: 'shell.users',
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
