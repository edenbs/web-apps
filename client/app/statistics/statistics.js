/**
 * Created by Noy Yizchaki on 3/5/2018.
 */
angular.module('classify')
    .config(function ($stateProvider) {
        $stateProvider.state('shell.statistics',{
                url: '/',
                templateUrl: 'app/statistics/statistics.html',
                controller: 'StatisticsController'
            }
        );
    });