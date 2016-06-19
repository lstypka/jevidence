reportNgApp.controller('ResultInPercentageChartCtrl', ['$scope', '$timeout', '$routeParams', 'StatisticsService', function ($scope, $timeout, $routeParams, StatisticsService) {

    var resultsInPercentageLegendData = [];
    var resultsInPercentagePieData = [];

    var initChart = function() {
           var resultsInPercentageOption = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}: {c}%",
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
                    data: resultsInPercentageLegendData
                },
                calculable : true,
                color: ["#27C24C", "#b5302c", "#F05050", "#23b7e5"],
                series : [
                    {
                        type:'pie',
                        radius : '70%',
                        center: ['50%', '50%'],
                        data: resultsInPercentagePieData
                    }
                ]
            };

           $timeout(function(){
                var TestResultInPercentageChartId = echarts.init(document.getElementById('TestResultInPercentageChartId'));
                TestResultInPercentageChartId.setOption(resultsInPercentageOption);
            }, 200);
        };

    var init = function () {
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var testsResultsInPercentage = response.testsResultsInPercentage;
            resultsInPercentageLegendData = ["Passed", "Error", "Failed", "Skipped"];
            resultsInPercentagePieData = [
                        {value: testsResultsInPercentage.success, name: resultsInPercentageLegendData[0]},
                        {value: testsResultsInPercentage.error, name: resultsInPercentageLegendData[1]},
                        {value: testsResultsInPercentage.failed, name: resultsInPercentageLegendData[2]},
                        {value: testsResultsInPercentage.skipped, name: resultsInPercentageLegendData[3]},
                       ];
              initChart();
        });

    };

    init();

}]);