'use strict';

angular.module('classify').controller('ManagersController', function($scope, $http, $mdEditDialog, managers, schools, $managers, $q, $mdDialog) {
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
                return $managers.save(manager).$promise
            })
            .then(function () {
                alert('manager added successfully');
                $scope.getItems();
            })
            .catch(function () {
                alert('error adding manager');
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