'use strict';

angular.module('classify').controller('ManagersController', function($scope, $http, $mdEditDialog, managers, schools, $managers, $q, $mdDialog) {
    $scope.items = managers;
    $scope.schools = schools;
    $scope.selected = [];

    $scope.query = {
        order: 'name.first',
        limit: 1,
        page: 1
    };

    $scope.getItems = function () {
        $scope.promise = $managers.query($scope.query).$promise.then(function (items) {
            $scope.selected = [];
            $scope.items = items;
        });
    };

    $scope.deleteItems = function () {
        $q.all(_.map($scope.selected, function (item) {
            return $managers.delete({}, item).$promise;
        }))
        .then(function () {
                $scope.getItems();
            });
    };

    $scope.addItem = function (ev) {
        $mdDialog.show({
            controller: 'AddManager',
            templateUrl: 'app/managers/new-manager/new-manager.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                schools: schools
            }
        })
            .then(function (manager) {
                return $managers.save(manager);
            })
            .then(function () {
                $scope.getItems();
            });
    };

    $scope.changeSchool = function (manager) {
        return $managers.update({}, manager).$promise
            .then(function () {
                alert('yay! saved!')
            })
            .catch(function (err) {
                alert(err);
            });
    }
});