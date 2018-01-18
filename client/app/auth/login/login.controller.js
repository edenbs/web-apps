'use strict';

angular.module('classify').controller('LoginController', function($scope, $location, $http, $state, $auth){
    $scope.message = "";
    $scope.error = "";
    $scope.loggedInUser = "";

    $scope.appLogin = function () {
        var result =  $auth.login($scope.user);

        $scope.message = result.$$state.value;
    };

    $scope.register = function () {
        $scope.message = ' Register!';

        $location.path("/register");
    };

    $scope.cancle = function () {
        $scope.message = 'Cancle!';
    };
});
