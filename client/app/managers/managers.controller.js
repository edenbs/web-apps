'use strict';

angular.module('classify').controller('ManagersController', function($scope, $mdEditDialog, managers, schools, $managers, $q, $mdDialog,$mdToast) {
    $scope.items = managers;
    $scope.schools = schools;
    $scope.selected = [];

    $scope.query = {
        sort: 'name.first',
        limit: 5,
        page: 1
    };

    $scope.getItems = function () {
        $scope.promise = $managers.paginate($scope.query).$promise.then(function (items) {
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
            return $managers.delete({}, item).$promise;
        }))
        .then(function () {
            $scope.getItems();
            $mdToast.showSimple('Manager deleted successfully').position('bottom left');
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
                return $managers.save(manager).$promise;
            })
            .then(function () {
                $scope.getItems();
                $mdToast.showSimple('Manager added successfully').position('bottom left');
            })
            .catch(function (err) {
                $mdToast.showSimple('Error adding a school manager ' + err.data.message).position('bottom left');
            });
    };

    $scope.changeSchool = function (manager) {
        return $managers.update({}, manager).$promise
            .then(function () {
                $mdToast.showSimple("Manager's school updated successfully").position('bottom left');
            })
            .catch(function (err) {
                var  updtMngErr = "Error updating a manager's school " + err.data.message;
                $mdToast.showSimple(updtMngErr).position('bottom left');
            });
    };
});