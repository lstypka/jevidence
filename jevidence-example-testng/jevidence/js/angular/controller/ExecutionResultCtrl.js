reportNgApp.controller('ExecutionResultCtrl', ["$scope", "$routeParams", "$location", "ExecutionService", function ($scope, $routeParams, $location, ExecutionService) {

    $scope.allowedStatuses = [
        {id: 0, style: 'test-error', label: "Error"},
        {id: 1, style: 'test-failed', label: 'Failed'},
        {id: 2, style: 'test-success', label: 'Success'},
        {id: 3, style: 'test-skipped', label: 'Skipped'},
        {id: 4, style: 'test-default', label: 'All'}];

    $scope.selectStatus = function (status) {
        $scope.selectedStatus = status;
        $scope.$emit('REFRESH_TOOLTIPS', { });
    };

    var filterResults = function (execution) {
        var testName = $location.search().testname;
        var params = $location.search().params;
        if (testName) {
            for (var i = 0; i < execution.testClasses.length; i++) {
                for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                    if (testName === (execution.testClasses[i].name + '.' + execution.testClasses[i].tests[j].name)) {
                        if ((params && params === JSON.stringify(execution.testClasses[i].tests[j].params)) || (!params && !execution.testClasses[i].tests[j].params)) {
                            var result = execution;
                            execution.testClasses[i].tests[j].expanded = true;
                            execution.testClasses[i].tests = [execution.testClasses[i].tests[j]];
                            result.testClasses = [execution.testClasses[i]];
                            result.testClasses[0].expanded = true;
                            return result;
                        }
                    }
                }
            }
        }

        return execution;
    };

    var init = function () {
        $scope.showSearchPanel = !$location.search().testname;
        ExecutionService.getExecution($routeParams.executionId, function (response) {
            $scope.execution = filterResults(response);
        });
    };


    init();

}]);