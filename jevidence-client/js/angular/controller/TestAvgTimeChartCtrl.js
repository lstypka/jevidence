reportNgApp.controller('TestAvgTimeChartCtrl', ["$scope", "$timeout", "$routeParams", "StatisticsService", function ($scope, $timeout, $routeParams, StatisticsService) {

    var categoryData = [];
    var valueData = [];

    var initChart = function() {
        var testAvgTimeChartOption = {
            tooltip : {
                trigger: 'item',
                formatter: "Time ranges {b}: Number of tests {c}",
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
            color: ['#f4ac28'],
            xAxis : [
                {
                    type : 'value',
                    boundaryGap : [0, 1],
                    name: 'Number of \ntests'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : categoryData,
                    name : 'Time range'
                }
            ],
            series : [
                {
                    type:'bar',
                    data:valueData
                }
            ]
        };

        $timeout(function(){
            var testAvgTimeChartChart = echarts.init(document.getElementById('TestAvgTimeChartCtrlId'));
            testAvgTimeChartChart.setOption(testAvgTimeChartOption );
        }, 100);
    };

    var init = function () {
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var testExecutionTime = response.testExecutionTime;

            for(var i = 0; i < testExecutionTime.ranges.length; i++) {
                var range = testExecutionTime.ranges[i];
                valueData.push(range.value);
                categoryData.push(''+ range.leftRange +'-' + range.rightRange + ' [ms]');
            }
            initChart();
        });
    };

    init();

}]);