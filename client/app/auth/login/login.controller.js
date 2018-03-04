'use strict';

angular.module('classify').controller('LoginController', function($scope, $state, auth,$mdToast){
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
                    if (err.data.name === 'IncorrectUsernameError' || err.data.name === 'IncorrectPasswordError') {
                        $mdToast.showSimple(err.data.message);
                    }
                    $scope.errors.other = err.message;
                });
        }
    };
});
