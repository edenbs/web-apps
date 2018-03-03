'use strict';

angular.module('classify')
    .controller('EditGrades', function ($scope, $mdDialog, $students, grades, student) {
        $scope.student = student;
        $scope.grades = grades;

        var refreshGrades = function () {
            $students.grades({id: student._id}).$promise
                .then(function (grades) {
                    $scope.grades = grades;
                })
        };

        $scope.update = function (grade) {
            $students.updateGrade({id: student._id, grade: grade._id}, grade).$promise.then(refreshGrades);
        };

        $scope.delete = function (grade) {
            $students.deleteGrade({id: student._id, grade: grade._id}).$promise.then(refreshGrades);
        };

        $scope.add = function () {
            $students.addGrade({id: student._id}, $scope.newGrade).$promise.then(function() {
                refreshGrades();
                $scope.newGrade = {};
            });
        };

        $scope.done = function () {
            $mdDialog.hide();
        }
    });