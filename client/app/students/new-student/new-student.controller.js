'use strict';

angular.module('classify')
    .controller('AddStudent', function ($scope, $mdDialog) {
        $scope.student = {name: {}, gender: 'female', avgGrade: 0};

        $scope.save = function () {
            $mdDialog.hide($scope.student);
        }
    });