'use strict';

angular.module('classify', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'angular-hamburglar',
    'md.data.table',
    'fixed.table.header',
    'ngResource',
    'ngCookies',
    'angularXRegExp',
    'btford.socket-io'
    ])
    .config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider, $mdAriaProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        $mdAriaProvider.disableWarnings();
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('deep-orange');
    })
    .factory('authInterceptor', function ($q, $cookieStore, $injector) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $injector.get('$state').go('login');

                    // remove any stale tokens
                    $cookieStore.remove('token');
                }
                else if (response.status === 403) {
                    $injector.get('$state').go('shell.home');
                }

                return $q.reject(response);
            }
        };
    })
    .run(function ($rootScope, auth, $state, $transitions) {
        // Redirect to login if you're not logged in
        $transitions.onStart({}, function (trans) {
            var data = trans.$to().data || {};

            if (!data.loginNotRequired) {
                return auth.isLoggedInAsync()
                    .then(function (loggedIn) {
                        if (loggedIn) {
                            if (data.requiredRole && !auth.hasRole(data.requiredRole)) {
                                return trans.router.stateService.target('shell.home');
                            }
                        } else {
                            return trans.router.stateService.target('login');
                        }
                    });
            }
            else if (data.loggedInForbidden) {
                return auth.isLoggedInAsync()
                    .then(function (loggedIn) {
                        if (loggedIn) {
                            return trans.router.stateService.target('shell.home');
                        }
                    });
            }
        });
    });

