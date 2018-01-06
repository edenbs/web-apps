'use strict';

angular.module('classify').controller('UsersController', function($scope,$http,$mdEditDialog) {

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

    $scope.avgGrade = function() {
        return "Hi"
    };

    $scope.selected = [];
    // create a message to display in our view
    $scope.message = 'Look! I am an about page.';

    $http({
        method: "GET",
        url: '../app/auth/user-data.json',
    }).then(function (response) {
        $scope.users = response.data;
        console.log(response);

    });
    $scope.query = {
        order: 'firstName',
        limit: 20,
        page: 1
    };
        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };

        $scope.limitOptions = [20, 40, 50, 10000];

        $scope.editComment = function (event, user) {
            // if auto selection is enabled you will want to stop the event
            // from propagating and selecting the row
            event.stopPropagation();

            var promise = $mdEditDialog.small({

                modelValue: user.firstName,
                placeholder: 'Add a comment',
                save: function (input) {
                    user.firstName = input.$modelValue;
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            });

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };
});