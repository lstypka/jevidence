reportNgApp.controller('StatisticsCtrl', ["$scope", "$timeout", "ExecutionService", "RecordsService",
    function ($scope, $timeout, ExecutionService, RecordsService) {


        var init = function () {
            RecordsService.getRecords(function (records) {
               $scope.numberOfExecutions = records.length
            }, function(response) {
                $scope.noRecords = true;
            });
        };

        init();
    }]);