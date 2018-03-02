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

            var  deleteMeng = 'Manager deleted successfully';
            $mdToast.showSimple(deleteMeng).position('bottom left');
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

                var  addMng = 'Manager added successfully';
                $mdToast.showSimple(addMng).position('bottom left');

            })
            .catch(function (err) {
                var  addMngErr = 'Error adding a school manager ' + err.data.message;
                $mdToast.showSimple(addMngErr).position('bottom left');

            });
    };

    $scope.changeSchool = function (manager) {
        return $managers.update({}, manager).$promise
            .then(function () {
                var  updtMng = "Manager's school updated successfully";

                $mdToast.showSimple(updtMng).position('bottom left');
            })
            .catch(function (err) {
                var  updtMngErr = "Error updating a manager's school " + err.data.message;
                $mdToast.showSimple(updtMngErr).position('bottom left');

            });
    };
});