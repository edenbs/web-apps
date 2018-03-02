'use strict';

angular.module('classify').controller('TeachersController', function($scope, $mdEditDialog, teachers, $teachers, $q, $mdDialog,$mdToast) {
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
            var  deleteTch = 'Teacher deleted successfully';
            $mdToast.showSimple(deleteTch).position('bottom left');

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
                $scope.getItems();

                var  addTch = 'Teacher  added successfully';
                $mdToast.showSimple(addTch).position('bottom left');

            })
            .catch(function (err) {
                var  addTcherr = 'Error adding teacher ' + err.data.message;
                $mdToast.showSimple(addTcherr).position('bottom left');

            });
    };

    $scope.changeRole = function (teacher) {
        return $teachers.update({}, teacher).$promise
            .then(function () {
                var  tchRole = 'Teacher role changed successfully';
                $mdToast.showSimple(tchRole).position('bottom left');


            })
            .catch(function (err) {
                var  tchRoleErr = 'Error changing teacher role  ' + err.data.message;
                $mdToast.showSimple(tchRoleErr).position('bottom left');

            });
    };
});