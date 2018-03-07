'use strict';

angular.module('classify').controller('StatisticsController',function($scope,$stats,classSize,avgGrade,$mdToast) {
    $scope.classSizeData = classSize;
    $scope.avgGradeData = avgGrade;
})
.directive('barsChart', function ($parse) {

        var directiveDefinitionObject = {
                restrict: 'E',
                replace: false,
                scope: {data: '=chartData' },
                link: function (scope, element, attrs) {
                    var chart = d3.select(element[0]);
                    chart.append("div").attr("class", "chart")
                        .selectAll('div')
                        .data(scope.data)
                        .enter().append("div")
                        .transition().ease(d3.easeLinear)
                        .style("width", function (d) {
                            return d.count + "%";
                        })
                        .text(function (d) {
                            return d._id;
                        });
                }
            };
        return directiveDefinitionObject;
})
.directive('gradechart', function ($parse) {
    var directiveDefinitionObject = {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData' },
            link: function (scope, element, attrs) {
                var chart = d3.select(element[0]);
                chart.append("div").attr("class", "chart")
                    .selectAll('div')
                    .data(scope.data)
                    .enter().append("div")
                    .transition().ease(d3.easeLinear)
                    .style("width", function (d) {
                        return d.averageGrade + "%";
                    })
                    .text(function (d) {
                        return d._id ;
                    });
            }
        };
    return directiveDefinitionObject;
});




