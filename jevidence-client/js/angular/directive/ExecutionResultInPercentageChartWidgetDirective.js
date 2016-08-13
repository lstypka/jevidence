reportNgApp.directive('executionResultInPercentageChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12 panel-content" ng-controller="executionResultInPercentageChartWidgetCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}};"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionResultInPercentageChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-result-in-percentage-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionResultInPercentageChartWidget'
    }
}]).controller('executionResultInPercentageChartWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'StatisticsService',
                function ($scope, $timeout, $routeParams, StatisticsService) {

    $scope.uniqueChartId = randomId();

    $scope.getChartHeight = function() {
       if($scope.options && $scope.options.height) {
            return $scope.options.height;
       }
       return "350px;";
    };

    var resultsInPercentageLegendData = [];
    var resultsInPercentagePieData = [];
    var defaultColors = ["#27C24C", "#b5302c", "#F05050", "#23b7e5"];
    var colors = [];

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
                x: 'center',
                data: resultsInPercentageLegendData
            },

            calculable : true,
            color: colors,
            series : [
                {
                    type:'pie',
                    radius : '70%',
                    center: ['50%', '50%'],
                    data: resultsInPercentagePieData,
                    itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    }
                                },
                }
            ]
        };

        $timeout(function(){
            applyCustomOptions(resultsInPercentageOption);
            var TestResultInPercentageChartId = echarts.init(document.getElementById($scope.uniqueChartId));
            TestResultInPercentageChartId.setOption(resultsInPercentageOption);
        }, 200);
    };

    var applyCustomOptions = function(defaultOptions) {
        if($scope.options) {
            if($scope.options.legend) {
                $.extend(defaultOptions.toolbox , $scope.options.legend);
            }
            if($scope.options.label && $scope.options.label.show !== undefined) {
                defaultOptions.series[0].itemStyle.normal.label.show = $scope.options.label.show;
                defaultOptions.series[0].itemStyle.normal.labelLine.show = $scope.options.label.show;
            }
            if($scope.options.toolbox) {
                $.extend(defaultOptions.toolbox , $scope.options.toolbox);
            }
        }
    };

    var applyCustomColors = function() {
        if($scope.options && $scope.options.color) {
            if($scope.options.color.passed) {
                defaultColors[0] = $scope.options.color.passed;
            }
            if($scope.options.color.error) {
                defaultColors[1] = $scope.options.color.error;
            }
            if($scope.options.color.failed) {
                defaultColors[2] = $scope.options.color.failed;
            }
            if($scope.options.color.skipped) {
                defaultColors[3] = $scope.options.color.skipped;
            }

        }
    };

    var init = function () {
        applyCustomColors();
        StatisticsService.getStatistics($routeParams.executionId, function (response) {
            var testsResultsInPercentage = response.testsResultsInPercentage;
            if(testsResultsInPercentage.success > 0) {
                resultsInPercentagePieData.push({value: testsResultsInPercentage.success, name: "Passed"});
                resultsInPercentageLegendData.push("Passed");
                colors.push(defaultColors[0]);
            }
            if(testsResultsInPercentage.error > 0) {
                resultsInPercentagePieData.push({value: testsResultsInPercentage.error, name: "Error"});
                resultsInPercentageLegendData.push("Error");
                colors.push(defaultColors[1]);
            }
            if(testsResultsInPercentage.failed > 0) {
                resultsInPercentagePieData.push({value: testsResultsInPercentage.failed, name: "Failed"});
                resultsInPercentageLegendData.push("Failed");
                colors.push(defaultColors[2]);
            }
            if(testsResultsInPercentage.skipped > 0) {
                resultsInPercentagePieData.push({value: testsResultsInPercentage.skipped, name: "Skipped"});
                resultsInPercentageLegendData.push("Skipped");
                colors.push(defaultColors[3]);
            }

            initChart();
        });
    };
    init();

}]);