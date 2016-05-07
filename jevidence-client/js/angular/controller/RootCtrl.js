reportNgApp.controller('RootCtrl', ["$scope", "$timeout", "$location", "ExecutionService", "RecordsService",
    function ($scope, $timeout, $location, ExecutionService, RecordsService) {

        var CANNOT_READ_RECORD_FILE = 1;
        $scope.errorStatus = 0;
        var init = function () {
            RecordsService.getRecords(function (records) {
               // think about getting records only one, in the rootCtrl

            }, function(data, status, headers, config) {
                window.console.log("ERROR!!! ", data, status, headers, config);
                $scope.errorStatus = CANNOT_READ_RECORD_FILE;
            });
        };

        init();

    }]);