'use strict';

angular.module('classify').controller('LoginController', function($scope, $state, auth){
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.login = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
            auth.login({
                id: $scope.user.id,
                password: $scope.user.password
            })
                .then(function () {
                    // Logged in, redirect to home
                    $state.go('shell.home');
                })
                .catch(function (err) {
                    if (err.name === 'IncorrectUsernameError' || err.name === 'IncorrectPasswordError') {
                        $mdToast.show(
                            $mdToast.simple()
                                .position('bottom right')
                                .content('email or password incorrect')
                                .hideDelay(6000)
                        );
                    }
                    $scope.errors.other = err.message;
                });
        }
    };
});
