'use strict';

angular.module('classify', [
    'ui.router',
    'ngMaterial',
    'angular-hamburglar',
    'md.data.table',
    'fixed.table.header',
    'ngResource',
    'ngCookies'
    ])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        //$httpProvider.interceptors.push('authInterceptor');

        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-orange');
    })
    .run(function ($rootScope, auth, $state) {
        // Redirect to login if you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            next.data = next.data || {};

            if (!next.data.loginNotRequired) {
                auth.isLoggedInAsync()
                    .then(function (loggedIn) {
                        if (loggedIn) {
                            if (next.data.requiredRole && !Auth.hasRole(next.data.requiredRole)) {
                                event.preventDefault();
                                $state.go('shell.home');
                            }
                        } else {
                            event.preventDefault();
                            $state.go('login');
                        }
                    });
            }
            else if (next.data.loggedInForbidden) {
                auth.isLoggedInAsync()
                    .then(function (loggedIn) {
                        if (loggedIn) {
                            event.preventDefault();
                            $state.go('shell.home');
                        }
                    });
            }
        });
    });

