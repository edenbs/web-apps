'use strict';

angular.module('classify').controller('StudentsController', function($scope, $mdEditDialog, students, $students, $q, $mdDialog,$mdToast) {
    $scope.items = students;
    $scope.selected = [];

    $scope.query = {
        sort: 'name.first',
        limit: 5,
        page: 1
    };

    $scope.validators = {
        name: {
            first: {
                'required': true
            },
            last: {
                'required': true
            }
        },
        class: {
            'required': true,
            'ng-pattern':/^(\p{L}{1,2}-[1-9][0-9]?)$/
        },
        avgGrade: {
            'required': true,
            'ng-pattern': '/^([0-9]|[1-8][0-9]|9[0-9]|100)$/'
        }
    };

    $scope.messages = {
        name: {
            first: {
                'required': 'First name is required'
            },
            last: {
                'required': 'Last name is required'
            }
        },
        class: {
            'required': 'Class is required',
            'pattern': 'Class must be formatted {class}-{number}'
        },
        avgGrade: {
            'required': 'Avergae grade is required',
            'pattern': 'Avergae grade must be between 0 to 100'
        }
    };

    $scope.onFilter = function () {
        $scope.query.page = 1;
        return $scope.getItems();
    };

    $scope.clearFilter = function (name) {
        _.set($scope.query, name, '');
        return $scope.getItems();
    };

    $scope.getItems = function () {
        $scope.promise = $students.paginate($scope.query).$promise.then(function (items) {
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
            return $students.delete({}, item).$promise;
        }))
            .then(function () {
                $scope.getItems();

                var  deleteStd = 'Student deleted successfully';
                $mdToast.showSimple(deleteStd).position('bottom left');

            });
    };

    $scope.addItem = function (ev) {
        $mdDialog.show({
            controller: 'AddStudent',
            templateUrl: 'app/students/new-student/new-student.html',
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (student) {
                return $students.save(student).$promise;
            })
            .then(function () {
                $scope.getItems();

                var  addStd = 'Student added successfully';
                $mdToast.showSimple(addStd).position('bottom left');

            })
            .catch(function (err) {
                var  addStderr = 'Error adding student' + err.data.message;
                $mdToast.showSimple(addStderr).position('bottom left');

            });
    };

    $scope.edit = function (event, student, property) {
        // Access nested properties
        var getPropertyIn = _.property(_.toPath(property));

        $mdEditDialog.large({
            modelValue: getPropertyIn(student),
            validators: getPropertyIn($scope.validators),
            messages: getPropertyIn($scope.messages),
            targetEvent: event,
            save: function (input) {
                _.set(student, property, input.$modelValue);

                $scope.deferred = $students.update(student).$promise;

                $scope.deferred
                    .then(function () {
                        var  updtStd = 'Student updated successfully';
                        $mdToast.showSimple(updtStd).position('bottom left');

                    })
                    .catch(function (err) {
                        var  updtStderr = 'Error updating student '+ err.data.message;
                        $mdToast.showSimple(updtStderr).position('bottom left');

                    });

                return $scope.deferred;
            }
        });
    };

    $scope.changeGender = function (student) {
        return $students.update({}, student).$promise
            .then(function () {
                var  updtStdGen = 'Student gender changed';
                $mdToast.showSimple(updtStdGen).position('bottom left');

            })
            .catch(function (err) {
                var  updtStdGenErr = 'Error changing student gender: ' + err.data.message;
                $mdToast.showSimple(updtStdGenErr).position('bottom left');

            });
    };
});