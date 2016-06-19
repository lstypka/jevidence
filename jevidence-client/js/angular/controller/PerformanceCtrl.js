reportNgApp.controller('PerformanceCtrl', ["$scope", "$timeout", "ExecutionService", "RecordsService", 'S2RevisionsService',
    function ($scope, $timeout, ExecutionService, RecordsService, S2RevisionsService) {

        $scope.selectedRevisions = {first: {id : null, text : null}, second: {id : null, text : null}};
        $scope.s2revisions = S2RevisionsService;
        $scope.threshold = {value : 0, type: 'milliseconds'};

        var timeDifferenceData = [];
        var xlabels = [];

        var generateCharts = function (intersection) {

            timeDifferenceData.splice(0, timeDifferenceData.length);
            xlabels.splice(0, xlabels.length);
            for (var i = 0; i < intersection.length; i++) {
                timeDifferenceData.push([intersection.length - 1 - i, intersection[i].difference]);
                xlabels.push((i));
            }
        };

        $scope.testsPerformanceChartData = [
            {label: "Time difference", data: timeDifferenceData}
        ];

        $scope.calculatePercentageDifference = function(test) {
            if(test.currentDuration > test.previousDuration) {
                return "+" + (Math.round(((test.currentDuration / test.previousDuration)*100)) - 100);
            }
            return "-" + (Math.round(((test.previousDuration / test.currentDuration )*100)) - 100);
        };

        var findTestName = function (index) {
            return $scope.intersection.length - 1 >= index ? $scope.intersection[$scope.intersection.length - 1 - index].name : "0";
        };

        $scope.testsPerformanceChartOptions = {
            series: {
                stack: false,
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                },
                color: "rgb(200, 20, 30)",
                threshold: {
                    below: 0,
                    color: "rgb(30, 180, 20)"
                }
            },
            xaxis: {
                tickFormatter: function (val, axis) {
                    return xlabels[val] ? xlabels[val] : '';
                },
                color: "black",
                axisLabel: "Tests",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            yaxis: {
                color: "black",
                axisLabel: "Time difference",
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: {colors: ["#EDF5FF", "#ffffff"]}
            },
            legend: {
                show: true
            },
            tooltip: true,
            tooltipOpts: {
                content: function (a, index, value) {
                    return '[' + findTestName(index) + '] Time difference: ' + (value > 0 ? '+' : '') + value + ' ms';
                },
                shifts: {
                    x: 20,
                    y: 0
                }
            }
        };

        var prepareRevisions = function (records) {
            $scope.revisions = [];
            for (var i = 0; i < records.length; i++) {
                $scope.revisions.push(records[i].id);
            }
            $scope.selectedRevisions.first = {id : $scope.revisions[0], text: $scope.revisions[0]};
            $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first.id;
            if ($scope.revisions.length > 1) {
                $scope.selectedRevisions.second = {id : $scope.revisions[1], text : $scope.revisions[1]};
                $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second.id;
            }
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
                        params: execution.testClasses[i].tests[j].params,
                        duration: execution.testClasses[i].tests[j].duration
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

        var findIntersection = function (currentSet, previousSet) {
            var intersection = [];
            for (var i = 0; i < currentSet.length; i++) {
                for (var j = 0; j < previousSet.length; j++) {
                    if (currentSet[i].name === previousSet[j].name) {
                        if (JSON.stringify(currentSet[i].params) === JSON.stringify(previousSet[j].params)) {
                            intersection.push({
                                name: currentSet[i].name,
                                params: currentSet[i].params,
                                currentStatus: currentSet[i].status,
                                previousStatus: previousSet[j].status,
                                currentDuration: currentSet[i].duration,
                                previousDuration: previousSet[j].duration,
                                difference: currentSet[i].duration - previousSet[j].duration
                            });
                            previousSet.splice(j, 1);
                            break;

                        }
                    }
                }
            }
            return intersection;
        };

        var thresholdFilter = function(intersection) {
            for (var i = intersection.length - 1; i >= 0; i--) {
                if($scope.threshold.type === 'milliseconds') {
                    if(Math.abs(intersection[i].difference) < Math.abs($scope.threshold.value)) {
                        intersection.splice(i, 1);
                    }
                }
                if($scope.threshold.type === 'seconds') {
                    if(Math.abs(intersection[i].difference) < Math.abs($scope.threshold.value * 1000)) {
                        intersection.splice(i, 1);
                    }
                }
                if($scope.threshold.type === 'percentage') {
                    var percentageDifference = parseInt($scope.calculatePercentageDifference(intersection[i]));
                     if(Math.abs(percentageDifference) < Math.abs($scope.threshold.value)) {
                        window.console.log("percentageDifference" + intersection[i].currentDuration + " / "+ intersection[i].previousDuration, percentageDifference);
                        intersection.splice(i, 1);
                     }
                }
            }
        };

        var executionComparator = function (currentExecution, previousExecution) {
            var currentExecutionSet = createSetsOfTests(currentExecution);
            var previousExecutionSet = createSetsOfTests(previousExecution);
            var intersection = findIntersection(currentExecutionSet, previousExecutionSet);
            sortByTimeDifference(intersection);
            thresholdFilter(intersection);
            generateCharts(intersection);
            return intersection;
        };

        $scope.thresholdChanged = function() {
           refreshChart();
        };

        $scope.stringify = function (value) {
            return JSON.stringify(value);
        };

        $scope.formatResult = function (result) {
            return result > 0 ? '+' + result : result;
        };

        $scope.changedRevision = function () {
            refreshChart();
        };

        var refreshChart = function() {
            if (parseInt($scope.selectedRevisions.first.id) > parseInt($scope.selectedRevisions.second.id)) {
                $scope.incorrectRevisions = false;
                $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first.id;
                $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second.id;

                ExecutionService.getExecution($scope.selectedRevisions.first.id, function (currentExecution) {
                    ExecutionService.getExecution($scope.selectedRevisions.second.id, function (previousExecution) {
                        $scope.intersection = executionComparator(currentExecution, previousExecution);
                        $scope.calculating = false;
                    });
                });
            } else {
                $scope.incorrectRevisions = true;
            }
            $scope.$emit('REFRESH_TOOLTIPS', { });
        };

        var init = function () {
            RecordsService.getRecords(function (records) {
                if (!records || records.length === 0) {
                    // no executions
                    return;
                }
                prepareRevisions(records);
                if (records.length === 1) {
                    ExecutionService.getExecution(records[0].id, function (execution) {
                        $scope.intersection = executionComparator(execution);
                        $scope.calculating = false;
                    });
                } else {
                    ExecutionService.getExecution(records[0].id, function (currenctExecution) {
                        ExecutionService.getExecution(records[1].id, function (previousExecution) {
                            $scope.intersection = executionComparator(currenctExecution, previousExecution);
                            $scope.calculating = false;
                        });
                    });
                }
            }, function (response) {
                $scope.noRecords = true;
            });
            $scope.$emit('REFRESH_TOOLTIPS', { });
        };

        var sortByTimeDifference = function (array) {
            array.sort(function (a, b) {
                return (-1 * (a.difference - b.difference));
            });
        };


        init();
    }]);