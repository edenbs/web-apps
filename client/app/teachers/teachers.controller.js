'use strict';

angular.module('classify').controller('TeachersController', function($scope, $http, $mdEditDialog, teachers, $teachers, $q, $mdDialog) {
    $scope.items = teachers;
    $scope.selected = [];

    $scope.query = {
        order: 'name.first',
        limit: 1,
        page: 1
    };

    $scope.getItems = function () {
        $scope.promise = $teachers.query($scope.query).$promise.then(function (items) {
            $scope.selected = [];
            $scope.items = items;
        });
    };

    $scope.deleteItems = function () {
        $q.all(_.map($scope.selected, function (item) {
            return $teachers.delete({}, item).$promise;
        }))
        .then(function () {
                $scope.getItems();
            });
    };

    $scope.addItem = function (ev) {
        $mdDialog.show({
            controller: 'AddTeacher',
            templateUrl: 'app/teachers/new-teacher/new-teacher.html',
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (teacher) {
                return $teachers.save(teacher);
            })
            .then(function () {
                $scope.getItems();
            });
    };

    $scope.changeRole = function (teacher) {
        return $teachers.update({}, teacher).$promise
            .then(function () {
                alert('yay! saved!')
            })
            .catch(function (err) {
                alert(err);
            });
    }
});