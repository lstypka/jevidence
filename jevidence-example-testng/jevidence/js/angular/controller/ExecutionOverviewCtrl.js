reportNgApp.controller('ExecutionOverviewCtrl', ["$scope", "$routeParams", "ExecutionService", function ($scope, $routeParams, ExecutionService) {


    var prepareParams = function (execution) {
        var transformedParams = {};
        for (var i = 0; i < execution.testClasses.length; i++) {
            for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                var params = execution.testClasses[i].tests[j].params;
                for (var property in params) {
                    if (params.hasOwnProperty(property)) {
                        var arrayOfParams = transformedParams[property];
                        if (!arrayOfParams) {
                            transformedParams[property] = [params[property]];
                        } else {
                            // check if param already exist
                            var found = false;
                            for (var k = 0; k < arrayOfParams.length; k++) {
                                if (arrayOfParams[k] === params[property]) {
                                    found = true;
                                }
                            }
                            if (!found) {
                                transformedParams[property].push(params[property]);
                            }
                        }
                    }
                }
            }
        }
        $scope.params = transformedParams;
    };

    $scope.executionStatus = function (execution) {
        if (execution) {
            if (execution.errors > 0) {
                return 'error';
            }
            if (execution.failed > 0) {
                return 'failed';
            }
            return 'success';
        }
    };

    var calculateStatistics = function (execution) {
        $scope.statistics = {};
        $scope.statistics.numberOfClasses = execution.testClasses.length;

        var numberOfTests = 0;
        var numberOfSteps = 0;
        var assertionErrors = 0;
        var otherErrors = 0;
        for (var i = 0; i < execution.testClasses.length; i++) {
            numberOfTests += execution.testClasses[i].tests.length;
            for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                numberOfSteps += execution.testClasses[i].tests[j].steps.length;
                for(var k = 0; k < execution.testClasses[i].tests[j].steps.length; k++) {
                    if(execution.testClasses[i].tests[j].steps[k].level === "error") {
                        if(execution.testClasses[i].tests[j].steps[k].assertionError) {
                            assertionErrors++;
                        } else {
                            otherErrors++;
                        }
                    }
                }
            }
        }
        $scope.statistics.numberOfTests = numberOfTests;
        $scope.statistics.numberOfSteps = numberOfSteps;
        $scope.statistics.numberOfAssertionErrors = assertionErrors;
        $scope.statistics.numberOfOtherErrors = otherErrors;
    };

    var init = function () {
        $scope.executionId = $routeParams.executionId;
        ExecutionService.getExecution($routeParams.executionId, function (response) {
            $scope.execution = response;
            prepareParams(response);
            calculateStatistics(response);
        });
    };

    init();

}]);