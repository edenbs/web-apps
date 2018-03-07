'use strict';

angular.module('classify').controller('StatisticsController',function($scope,$stats,classSize,avgGrade,$mdToast, socket) {
    $scope.classSizeData = classSize;
    $scope.avgGradeData = avgGrade;

    socket.forward('studentsUpdated', $scope);
    $scope.$on('socket:studentsUpdated', function (ev, data) {
        $mdToast.showSimple('Students\'s data changed!! Better refresh your stats.');
    });
});