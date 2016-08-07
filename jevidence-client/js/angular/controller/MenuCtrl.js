reportNgApp.controller('MenuCtrl', ["$scope", "$timeout", "$location", "ExecutionService", "RecordsService",
    function ($scope, $timeout, $location, ExecutionService, RecordsService) {

        var init = function () {
            RecordsService.getRecords(function (records) {
                $scope.executions = [];
                $scope.executions = records;
                for (var i = 0; i < $scope.executions.length; i++) {
                    $scope.executions[i].percentageClass = $scope.executions[i].percentage < 50 ? 'badge-border-danger' : ($scope.executions[i].percentage < 85 ? 'badge-border-warning' : 'badge-border-success');
                }

                // refresh jquery script
                $timeout(function () {
                    jQuery(".sidebar .treeview").tree();
                }, 100);

            }, function(response) {
                $scope.noRecords = true;
            });
        };

        init();

        $scope.isNodeActive = function (node) {
            return $location.url().indexOf(node) !== -1;
        };

        $scope.isExecutionNodeActive = function (node) {
            return $location.url().indexOf(node) !== -1;
        };

        $scope.formatDirNameToTime = function(dirName) {
            var spitValue = dirName.split('_');
            return spitValue[0] + '-' + spitValue[1] + '-' + spitValue[2] + ' ' + spitValue[3] + ':' + spitValue[4] + ':' + spitValue[5];
        };

    }]);