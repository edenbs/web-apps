'use strict';

angular.module('classify')
    .service('auth', function Auth($location, $rootScope, $http, $users, $cookieStore, $q, $state) {
        var promise = null;
        var currentUser = null;
        var self = this;

        var initCurrentUser = function () {
            promise = $users.me().$promise;
            promise.then(function (user) {
                currentUser = user;
                promise = null;
            });
        };

        if ($cookieStore.get('token')) {
            initCurrentUser();
        }

        this.login = function (user) {
            return $http.post('/auth', {
                id: user.id,
                password: user.password
            })
                .then(function (data) {
                    $cookieStore.put('token', data.data.token);
                    initCurrentUser();
                })
                .catch(function (err) {
                    self.logout();
                    throw err;
                });
        };

        this.logout = function () {
            $cookieStore.remove('token');
            currentUser = null;
            $state.go('login');
        };

        this.changePassword = function (oldPassword, newPassword) {
            return $users.changePassword({id: currentUser._id}, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }).$promise;
        };

        this.getCurrentUser = function () {
            return currentUser;
        };

        this.isLoggedInAsync = function () {
            if (promise) {
                return promise.then(function () {
                    return true;
                }).catch(function () {
                    return false
                });
            } else {
                return $q.resolve(!!currentUser);
            }
        };

        this.getToken = function () {
            return $cookieStore.get('token');
        };

        this.hasRole = function (role) {
            if (!currentUser) {
                return false;
            }

            return role === currentUser.role;
        };
    });
