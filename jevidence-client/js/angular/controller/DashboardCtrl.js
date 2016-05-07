reportNgApp.controller('DashboardCtrl', ["$scope", "$timeout", "ExecutionService", "RecordsService",
    function ($scope, $timeout, ExecutionService, RecordsService) {

        $scope.calculating = false;
        $scope.revisions = [];
        $scope.selectedRevisions = {first: null, second: null};

        var init = function () {
            $scope.calculating = true;
            RecordsService.getRecords(function (records) {
            $scope.numberOfExecutions = records.length
                if (!records || records.length === 0) {
                    // no executions
                    return;
                }
                prepareRevisions(records);
                if (records.length === 1) {
                    ExecutionService.getExecution(records[0].id, function (execution) {
                        $scope.differences = executionComparator(execution);
                        $scope.calculating = false;
                    });
                } else {
                    ExecutionService.getExecution(records[0].id, function (currenctExecution) {
                        ExecutionService.getExecution(records[1].id, function (previousExecution) {
                            $scope.differences = executionComparator(currenctExecution, previousExecution);
                            $scope.calculating = false;
                        });
                    });
                }
            }, function(response) {
                $scope.noRecords = true;
            });
        };

        var prepareRevisions = function (records) {
            for (var i = 0; i < records.length; i++) {
                $scope.revisions.push(records[i].id);
            }
            $scope.selectedRevisions.first = $scope.revisions[0];
            $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first;
            if ($scope.revisions.length > 1) {
                $scope.selectedRevisions.second = $scope.revisions[1];
                $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second;
            }
        };

        var executionComparator = function (currentExecution, previousExecution) {
            var currentExecutionSet = createSetsOfTests(currentExecution);
            var previousExecutionSet = createSetsOfTests(previousExecution);
            var differences = findDifferences(currentExecutionSet, previousExecutionSet);

            $scope.added = differences.successCount + differences.failedCount + differences.errorCount + differences.skippedCount;
            $scope.success = differences.successCount;
            $scope.failed = differences.failedCount;
            $scope.error = differences.errorCount;
            $scope.skipped = differences.skippedCount;

            return differences;
        };

        var createSetsOfTests = function (execution) {
            var executionSet = [];
            if (!execution) {
                return executionSet;
            }
            for (var i = 0; i < execution.testClasses.length; i++) {
                for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                    var element = {
                        name: execution.testClasses[i].name + "." + execution.testClasses[i].tests[j].name,
                        status: execution.testClasses[i].tests[j].status,
                        params: execution.testClasses[i].tests[j].params
                    };
                    if (!checkIfElementAlreadyExist(executionSet, element)) {
                        executionSet.push(element);
                    }
                }
            }
            return executionSet;
        };

        var checkIfElementAlreadyExist = function (array, element) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name === element.name) {
                    if (JSON.stringify(array[i].params) === JSON.stringify(element.params)) {
                        return true;
                    }
                }
            }
            return false;
        };

        var findDifferences = function (currentSet, previousSet) {
            var differences = {
                added: [],
                success: [],
                error: [],
                failed: [],
                skipped: [],
                successCount: 0,
                errorCount: 0,
                failedCount: 0,
                skippedCount: 0
            };
            for (var i = 0; i < currentSet.length; i++) {
                var found = false;
                for (var j = 0; j < previousSet.length; j++) {
                    if (currentSet[i].name === previousSet[j].name) {
                        if (JSON.stringify(currentSet[i].params) === JSON.stringify(previousSet[j].params)) {
                            found = true;
                            if (currentSet[i].status === previousSet[j].status) {
                                previousSet.splice(j, 1);
                                break;
                            } else {
                                // different statuses
                                var diff = {
                                    name: currentSet[i].name,
                                    params: currentSet[i].params,
                                    currentStatus: currentSet[i].status,
                                    previousStatus: previousSet[j].status
                                };
                                modifyCounts(differences, diff);

                                // remove test from previousSet
                                previousSet.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
                if (!found) {
                    // newly added tests
                    var diff = {
                        name: currentSet[i].name,
                        params: currentSet[i].params,
                        currentStatus: currentSet[i].status,
                        previousStatus: "UNKNOWN"
                    };
                    modifyCounts(differences, diff);
                    differences.added.push(diff);
                }
            }
            return differences;
        };

        var modifyCounts = function (differences, diff) {
            if (diff.currentStatus === 'SUCCESS') {
                differences.success.push(diff);
                differences.successCount++;
            } else if (diff.currentStatus === 'ERROR') {
                differences.error.push(diff);
                differences.errorCount++;
            } else if (diff.currentStatus === 'FAILED') {
                differences.failed.push(diff);
                differences.failedCount++;
            } else if (diff.currentStatus === 'SKIPPED') {
                differences.skipped.push(diff);
                differences.skippedCount++;
            }

            if (diff.previousStatus === 'SUCCESS') {
                differences.successCount--;
            } else if (diff.previousStatus === 'ERROR') {
                differences.errorCount--;
            } else if (diff.previousStatus === 'FAILED') {
                differences.failedCount--;
            } else if (diff.previousStatus === 'SKIPPED') {
                differences.skippedCount--;
            }
        };

        $scope.formatNumber = function (number) {
            return number > 0 ? '+' + number : number;
        };

        $scope.isNewlyAdded = function (test) {
            return test.previousStatus === 'UNKNOWN' ? 'True' : 'False';
        };

        $scope.changedRevision = function () {
            if (parseInt($scope.selectedRevisions.first) > parseInt($scope.selectedRevisions.second)) {
                $scope.incorrectRevisions = false;
                $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first;
                $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second;

                ExecutionService.getExecution($scope.selectedRevisions.first, function (currentExecution) {
                    ExecutionService.getExecution($scope.selectedRevisions.second, function (previousExecution) {
                        $scope.differences = executionComparator(currentExecution, previousExecution);
                        $scope.calculating = false;
                    });
                });
            } else {
                $scope.incorrectRevisions = true;
            }
        };

        $scope.stringify = function(value) {
            return JSON.stringify(value);
        };

        init();
    }]);