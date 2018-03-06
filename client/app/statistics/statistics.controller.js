'use strict';

angular.module('classify').controller('StatisticsController',function($scope) {
    $scope.classData = [{
        "class": "A-1", "grade": "80"},
        {"class": "A-2",
            "grade": "90"},
        {"class": "A-3",
            "grade": "30"},
        {"class": "B-1",
            "grade": "98"},
        {"class": "B-2",
            "grade": "40"},
        {"class": "B-3",
            "grade": "90"},
        {"class": "G-1",
            "grade": "100"},
        {"class": "G-2",
            "grade": "60"},
        {"class": "G-3",
            "grade": "85"
        }];
    $scope.barData = [{"grades":"0-20", "amount":8},
        {"grades":"21-55", "amount":10},
        {"grades":"56-75", "amount":19},
        {"grades":"76-90", "amount":20},
        {"grades":"91-100", "amount":16}];

})
.directive('barsChart', function ($parse) {
        var directiveDefinitionObject =
            {
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
                            return d.grade + "%";
                        })
                        .text(function (d) {
                            return d.class;
                        });
                }
            };
        return directiveDefinitionObject;
    }) .directive('linechart', function ($parse) {
    var directiveDefinitionObject =
        {
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
                        return d.amount + "%";
                    })
                    .text(function (d) {
                        return d.grades ;
                    });
            }
        };
    return directiveDefinitionObject;
});




