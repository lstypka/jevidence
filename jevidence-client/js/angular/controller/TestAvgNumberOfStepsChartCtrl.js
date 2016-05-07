reportNgApp.controller('TestAvgNumberOfStepsChartCtrl', ["$scope", "$routeParams", "StatisticsService",
    function ($scope, $routeParams, StatisticsService) {

    var init = function () {
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var numberOfSteps = response.numberOfSteps;

            var sum = 0;
            for(var i = 0; i < numberOfSteps.ranges.length; i++) {
                sum += numberOfSteps.ranges[i].value;
            }

            $scope.avgNumberOfStepsChartData = [];
            for(var i = 0; i < numberOfSteps.ranges.length; i++) {
                var range = numberOfSteps.ranges[i];
                range.value = (range.value / sum) * 100;
                $scope.avgNumberOfStepsChartData.push({
                    label : range.leftRange + "-" + range.rightRange,
                    data: range.value
                })
            }

        });
    };

    init();



    $scope.avgNumberOfStepsChartOptions = {
        series: {
            pie: {
                show: true,
                label: {
                    show: true,
                    radius: 3 / 4,
                    background: {
                        opacity: 0.9,
                        color: '#FFF'
                    }
                }
            }
        },
        grid: {
            hoverable: true
        },
        legend: {
            noColumns: 1,
            container: "#avgNumberOfStepsChartLegend"
        },
        colors: ["#00CF0C", "#0C74CF", "#CFAD0E", "#930FCF", "#CF2A00", "#FFA500", "#FF9567"],
        tooltip: true,
        tooltipOpts: {
            content: "%p.0% percentage of tests have %s steps",
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: true
        }
    };

}]);