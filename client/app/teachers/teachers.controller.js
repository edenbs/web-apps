'use strict';

angular.module('classify').controller('TeachersController', function($scope, $http, $mdEditDialog, teachers, $teachers, $q, $mdDialog) {
    $scope.items = teachers;
    $scope.selected = [];

    $scope.query = {
        sort: 'name.first',
        limit: 5,
        page: 1
    };

    $scope.getItems = function () {
        $scope.promise = $teachers.paginate($scope.query).$promise.then(function (items) {
            $scope.selected = [];
            $scope.items = items;
        });
    };

    $scope.onOrderChange = function (sort) {
        $scope.query.sort = sort;
        return $scope.getItems();
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
                return $teachers.save(teacher).$promise;
            })
            .then(function () {
                alert('teacher added successfully');
                $scope.getItems();
            })
            .catch(function (err) {
                alert('error adding teacher')
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