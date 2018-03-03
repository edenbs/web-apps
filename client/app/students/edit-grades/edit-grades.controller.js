'use strict';

angular.module('classify')
    .controller('EditGrades', function ($scope, $mdDialog, $students, grades, student, $mdToast) {
        $scope.student = student;
        $scope.grades = grades;

        var refreshGrades = function () {
            $students.grades({id: student._id}).$promise
                .then(function (grades) {
                    $scope.grades = grades;
                })
        };

        $scope.update = function (grade) {
            $students.updateGrade({id: student._id, grade: grade._id}, grade).$promise
                .then(function () {
                    refreshGrades();
                    $mdToast.showSimple('Grade was updated successfully');
                })
                .catch(function () {
                    $mdToast.showSimple('Error updating grade');
                });
        };

        $scope.delete = function (grade) {
            $students.deleteGrade({id: student._id, grade: grade._id}).$promise
                .then(function () {
                    refreshGrades();
                    $mdToast.showSimple('Grade was removed successfully');
                })
                .catch(function () {
                    $mdToast.showSimple('Error removing grade');
                });
        };

        $scope.add = function () {
            $students.addGrade({id: student._id}, $scope.newGrade).$promise
                .then(function() {
                    refreshGrades();
                    $scope.newGrade = {};
                    $mdToast.showSimple('Grade was added successfully');
                })
                .catch(function() {
                    $mdToast.showSimple('Error adding grade');
                });
        };

        $scope.done = function () {
            $mdDialog.hide();
        }
    });