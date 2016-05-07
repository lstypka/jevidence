reportNgApp.controller('TestsTrendStatusChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var xlabels = [];
    var d1 = [];
    var d2 = [];
    var d3 = [];
    var d4 = [];

    var init = function () {
        RecordsService.getRecords(function (records) {
            for (var i = records.length - 1; i >= 0; i--) {
                if (records.length === 1) {
                    xlabels.push("#0");
                    d1.push([0, 0]);
                    d2.push([0, 0]);
                    d3.push([0, 0]);
                    d4.push([0, 0]);

                    xlabels.push("#" + records[i].id);
                    d1.push([records.length - i, records[i].success]);
                    d2.push([records.length - i, records[i].failed]);
                    d3.push([records.length - i, records[i].error]);
                    d4.push([records.length - i, records[i].skipped]);
                } else {
                    xlabels.push("#" + records[i].id);
                    d1.push([records.length - i - 1, records[i].success]);
                    d2.push([records.length - i - 1, records[i].failed]);
                    d3.push([records.length - i - 1, records[i].error]);
                    d4.push([records.length - i - 1, records[i].skipped]);
                }
            }
        }, function (response) {
            $scope.noRecords;
        });

        $scope.testsTrendChartData = [
            {label: "Success", data: d1},
            {label: "Failed", data: d2},
            {label: "Error", data: d3},
            {label: "Skipped", data: d4}
        ];

        $scope.testsTrendChartOptions = {
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
                    return xlabels[val] ? xlabels[val] : '';
                },
                color: "black",
                axisLabel: "Execution",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            yaxis: {
                color: "black",
                axisLabel: "Number of tests",
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial'
            },
            colors: ["#008000", "#d9534f", "#8b0000", "#5bc0de"],
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
                content: "Execution %x, Number of %s tests: %y",
                shifts: {
                    x: 20,
                    y: 0
                }
            }
        };
    };

    init();

}]);