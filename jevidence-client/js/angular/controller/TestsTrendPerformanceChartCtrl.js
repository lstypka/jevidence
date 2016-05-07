reportNgApp.controller('TestsTrendPerformanceChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var xlabels = [];
    var executionTime = [];

    var init = function () {
        RecordsService.getRecords(function (records) {
            for(var i = records.length-1; i >=0 ; i--) {
                if(records.length === 1) {
                    xlabels.push("#0");
                    executionTime.push([0, 0]);
                    xlabels.push("#"+records[i].id);
                    executionTime.push([1, records[i].duration]);
                } else {
                    xlabels.push("#"+records[i].id);
                    executionTime.push([records.length - i - 1, records[i].duration]);
                }

            }

        }, function(response) {
            $scope.noRecords;
        });

        $scope.testsTrendPerformanceChartData = [
            {label: "Execution time", data: executionTime}
        ];

        $scope.testsTrendPerformanceChartOptions = {
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
                axisLabel: "Duration",
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            colors: ["#008000"],
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