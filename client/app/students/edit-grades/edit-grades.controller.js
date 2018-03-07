'use strict';

angular.module('classify')
    .controller('EditGrades', function ($scope, $mdDialog, $students, $users, grades, student, subjects, $mdToast,auth) {
        $scope.student = student;
        $scope.grades = grades;
        $scope.mySubjects = subjects;
        $scope.newGrade = {};

        var refreshGrades = function () {
            $students.grades({id: student._id}).$promise
                .then(function (grades) {
                    $scope.grades = grades;
                })
        };

        var refreshMySubjects = function () {
            $users.mySubjects({limit: 1}).$promise
                .then(function (subjects) {
                    $scope.mySubjects = subjects;
                })
        };

        $scope.setSubject = function (subject) {
            $scope.newGrade.subject = subject;
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
                    refreshMySubjects();
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
                    refreshMySubjects();
                    $scope.newGrade = {};
                    $mdToast.showSimple('Grade was added successfully');
                })
                .catch(function() {
                    $mdToast.showSimple('Error adding grade');
                });
        };

        $scope.done = function () {
            $mdDialog.hide();
        };

        $scope.isEditor = function () {
            return auth.hasRole('editor');
        };

    });