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
            return node === $location.path();
        };

        $scope.isExecutionNodeActive = function (node) {
            return $location.path().startsWith(node);
        };

    }]);