reportNgApp.controller('TestsAvgTimeTrendPerformanceChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var executions = [];
    var avgExecutionTime = [];

    var initChart = function() {
        var testsAvgTimeTrendPerformanceChartOption = {
                tooltip : {
                    trigger: 'axis',
                    formatter: "Execution({b}) average test time: {c}ms",
                },
                legend: {
                    data : ['Average test time']
                },

                toolbox: {
                    show : true,
                    color: ['#555', '#555'],
                    feature : {
                        restore : {show: true, title: "Refresh"},
                        saveAsImage : {show: true, title: "Save image"}
                    }
                },
                calculable : false,
                color: ["#008ACD"],
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : executions,
                        name: 'Execution id'
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name: 'Avg Time [ms]'
                    }
                ],
                series : [
                    {
                        name:'Average test time',
                        type:'line',
                        stack: 'Average test time',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:avgExecutionTime
                    }
                ]
            };

        $timeout(function(){
            var testsAvgTimeTrendPerformanceChart = echarts.init(document.getElementById('testsAvgTimeTrendPerformanceChart'));
            testsAvgTimeTrendPerformanceChart.setOption(testsAvgTimeTrendPerformanceChartOption );
        }, 100);
    };

    var init = function () {
        RecordsService.getRecords(function (records) {
            for(var i = records.length-1; i >=0 ; i--) {
                if(records.length === 1) {
                    executions.push("#0");
                    avgExecutionTime.push(0);

                    executions.push("#"+records[i].id);
                    var avg = records[i].duration / (records[i].success + records[i].skipped + records[i].failed + records[i].error);
                    avgExecutionTime.push(avg);
                } else {
                    executions.push("#"+records[i].id);
                    var avg = records[i].duration / (records[i].success + records[i].skipped + records[i].failed + records[i].error);
                    avgExecutionTime.push(avg);
                }
            }
            initChart();
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