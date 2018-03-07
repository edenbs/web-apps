angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.statistics',{
                url: '/statistics',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsController',

                resolve:{
                    classSize: function ($stats) {
                        return $stats.numInClass().$promise.then(function (data) {
                            var all = 0;
                            angular.forEach(data,function (d) {
                                all += d.count;
                            });

                            angular.forEach(data,function (d) {
                                 d.count =  (d.count / all)*100;
                            });

                            return data;
                        });
                    },
                    avgGrade: function ($stats) {
                        return $stats.avgGradeInClass().$promise;
                    }
                 }
            }
        );
    });