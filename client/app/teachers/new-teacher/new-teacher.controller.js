'use strict';

angular.module('classify')
    .controller('AddTeacher', function ($scope, $mdDialog) {
        $scope.teacher = {name: {}, role: 'viewer'};

        $scope.save = function () {
            $mdDialog.hide($scope.teacher);
        }
    });