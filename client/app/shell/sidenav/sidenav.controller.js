'use strict';

angular.module('classify')
    .controller('SidenavController', function ($scope, $rootScope, $mdSidenav, $mdDialog, $state, auth) {
        $scope.toggleMenu = function () {
            $mdSidenav('sideNav').toggle();
        };

        $scope.logout = function () {
           auth.logout();
        };

        $scope.user =  auth.getCurrentUser();

        var menuList = [{
            text: 'Home',
            state: 'shell.home',
            iconClass: 'home'
        },{
            text: 'Teachers',
            state: 'shell.teachers',
            iconClass: 'account'
        },{
            text: 'Managers',
            state: 'shell.managers',
            iconClass: 'account'
        },{
            text: 'Students',
            state: 'shell.students',
            iconClass: 'account'
        },{
            text: 'Statistics',
            state: 'shell.statistics',
            iconClass: 'account'
        },
            {
                text: 'About',
                state: 'shell.about',
                iconClass: 'account'
            }];

        $scope.menuList = _.filter(menuList, function (item) {
            var role = ($state.get(item.state).data || {}).requiredRole;
            return role ? auth.hasRole(role) : true;
        });
    });
