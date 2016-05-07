reportNgApp.controller('TestsAvgTimeTrendPerformanceChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var xlabels = [];
    var avgExecutionTime = [];

    var init = function () {
        RecordsService.getRecords(function (records) {
            for(var i = records.length-1; i >=0 ; i--) {
                if(records.length === 1) {
                    xlabels.push("#0");
                    avgExecutionTime.push([0, 0]);

                    xlabels.push("#"+records[i].id);
                    var avg = records[i].duration / (records[i].success + records[i].skipped + records[i].failed + records[i].error);
                    avgExecutionTime.push([records.length - i, avg]);
                } else {
                    xlabels.push("#"+records[i].id);
                    var avg = records[i].duration / (records[i].success + records[i].skipped + records[i].failed + records[i].error);
                    avgExecutionTime.push([records.length - i - 1, avg]);
                }
            }
        }, function(response) {
            $scope.noRecords;
        });

        $scope.testsAvgTimeTrendPerformanceChartData = [
            {label: "Avg test time", data: avgExecutionTime}
        ];

        $scope.testsAvgTimeTrendPerformanceChartOptions = {
            series: {
                stack: false,
                lines: {
                    show: true,
                    fill: true,
                    steps: false
                }
            },
            xaxis: {
                tickFormatter: function (val, axis) {
                    return xlabels[val]? xlabels[val] : '' ;
                },
                color: "black",
                axisLabel: "Execution",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            yaxis: {
                color: "black",
                axisLabel: "Avg test's duration",
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            colors: ["#FFA500"],
            grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#EDF5FF", "#ffffff"] }
            },
            legend: {
                show: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "Execution(%x) duration: %y [ms]",
                shifts: {
                    x: 20,
                    y: 0
                }
            }
        };
    };

    init();
}]);