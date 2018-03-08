angular.module('classify')
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
                        return d.count*0.9 + "%";
                    })
                    .text(function (d) {
                        return d._id + ': ' + d.count;
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
                        return d.averageGrade*0.9 + "%";
                    })
                    .text(function (d) {
                        return d._id + ': ' + d.averageGrade;
                    });
            }
        };
        return directiveDefinitionObject;
    });
