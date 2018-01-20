'use strict';

angular.module('classify')
    .controller('AddManager', function ($scope, $mdDialog, schools) {
        $scope.schools = schools;
        $scope.manager = {name: {}, school:schools[0]._id};

        $scope.save = function () {
            $mdDialog.hide($scope.manager);
        }
    });