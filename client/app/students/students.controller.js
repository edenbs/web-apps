'use strict';

angular.module('classify')
    .controller('StudentsController', function($scope, $http) {

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        $scope.selected = [];
    // create a message to display in our view
    $scope.message = 'Look! I am an about page.';
    // create a message to display in our view
    $scope.message = 'Look! I am an about page.';
    $http({
        method: "GET",
        url: 'https://randomuser.me/api/?results=50',
        params: {
            dataType: "json"
        }
    }).then(function (response) {
        $scope.studentList = response.data.results;
        console.log(response);

    })
    $scope.query = {
        order: 'name',
        limit: 20,
        page: 1
    };
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }

            $scope.limitOptions = [20, 40, 50, 10000];


    });