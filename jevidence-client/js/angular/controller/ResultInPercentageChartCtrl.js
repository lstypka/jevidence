reportNgApp.controller('ResultInPercentageChartCtrl', ['$scope', '$routeParams', 'StatisticsService', function ($scope, $routeParams, StatisticsService) {

    var init = function () {
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var testsResultsInPercentage = response.testsResultsInPercentage;
            $scope.resultsInPercentageChartData = [
                {
                    label: "Passed",
                    data: testsResultsInPercentage.success
                },
                {
                    label: "Error",
                    data: testsResultsInPercentage.error
                },
                {
                    label: "Failed",
                    data: testsResultsInPercentage.failed
                },
                {
                    label: "Skipped",
                    data: testsResultsInPercentage.skipped
                }
            ];
        });
    };

    init();

    $scope.resultsInPercentageChartOptions = {
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
        colors: ["#27C24C", "#b5302c", "#F05050", "#23b7e5"],
        grid: {
            hoverable: true
        },
        legend: {
            noColumns: 1,
            container: "#resultInPercentageChartLegend"
        },
        tooltip: true,
        tooltipOpts: {
            content: "%s %p.0%",
            shifts: {
                x: 20,
                y: 0
            },
            style: "border: 1px solid;",
            defaultTheme: true
        }
    };

}]);