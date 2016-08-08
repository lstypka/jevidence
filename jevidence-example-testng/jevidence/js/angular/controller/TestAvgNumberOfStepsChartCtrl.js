reportNgApp.controller('TestAvgNumberOfStepsChartCtrl', ["$scope", "$timeout", "$routeParams", "StatisticsService",
    function ($scope, $timeout, $routeParams, StatisticsService) {

    var legendData = [];
    var pieData = [];

    var initChart = function() {
       var testAvgNumberOfStepsChartOption = {
            tooltip : {
                trigger: 'item',
                formatter: "{c}% of tests<br/>have {b} steps",
            },
            toolbox: {
                    show : true,
                    color: ['#555', '#555'],
                    feature : {
                        restore : {show: true, title: "Refresh"},
                        saveAsImage : {show: true, title: "Save image"}
                    }
            },
            legend: {
                orient : 'horizontal',
                y: 'bottom',
                data: legendData
            },
            calculable : true,
             color: ["#00CF0C", "#0C74CF", "#CFAD0E", "#930FCF", "#CF2A00", "#FFA500", "#FF9567"],
            series : [
                {
                    type:'pie',
                    radius : '70%',
                    center: ['50%', '50%'],
                    data: pieData
                }
            ]
        };

       $timeout(function(){
            var testAvgNumberOfStepsChart = echarts.init(document.getElementById('TestAvgNumberOfStepsChartId'));
            testAvgNumberOfStepsChart.setOption(testAvgNumberOfStepsChartOption );
        }, 100);
    };

    var init = function () {
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var numberOfSteps = response.numberOfSteps;

            var sum = 0;
            for(var i = 0; i < numberOfSteps.ranges.length; i++) {
                sum += numberOfSteps.ranges[i].value;
            }

            for(var i = 0; i < numberOfSteps.ranges.length; i++) {
                var range = numberOfSteps.ranges[i];
                range.value = (range.value / sum) * 100;
                legendData.push(range.leftRange + "-" + range.rightRange);
                pieData.push({value: Math.round(range.value), name : range.leftRange + "-" + range.rightRange});
            }

            initChart();
        });
    };

    init();

}]);