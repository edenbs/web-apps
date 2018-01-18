'use strict';

angular.module('classify').controller('TeachersController', function($scope, $http, $mdEditDialog, teachers, $teachers) {
    $scope.teachers = teachers;

    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.selected = [];

    $scope.query = {
        order: 'firstName',
        limit: 20,
        page: 1
    };
    $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };

    $scope.limitOptions = [20, 40, 50, 10000];

    $scope.editFirstName = function (event, teacher) {
        // if auto selection is enabled you will want to stop the event
        // from propagating and selecting the row
        event.stopPropagation();

        $mdEditDialog.small({
            modelValue: teacher.name.firstName,
            placeholder: 'First Name',
            save: function (input) {
                user.firstName = input.$modelValue;
                return $teachers.update({}, teacher).$promise;
            },
            targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
        });
    };

    $scope.editLastName = function (event, teacher) {
        // if auto selection is enabled you will want to stop the event
        // from propagating and selecting the row
        event.stopPropagation();

        $mdEditDialog.small({
            modelValue: teacher.name.lastName,
            placeholder: 'Last Name',
            save: function (input) {
                user.firstName = input.$modelValue;
                return $teachers.update({}, teacher).$promise;
            },
            targetEvent: event,
            validators: {
                'md-maxlength': 30
            }
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