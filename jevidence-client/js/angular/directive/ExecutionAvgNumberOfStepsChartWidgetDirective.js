reportNgApp.directive('executionAvgNumberOfStepsChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12 panel-content" ng-controller="executionAvgNumberOfStepsChartWidgetCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}};"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionAvgNumberOfStepsChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-avg-number-of-steps-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionAvgNumberOfStepsChartWidget'
    }
}]).controller('executionAvgNumberOfStepsChartWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'StatisticsService',
                function ($scope, $timeout, $routeParams, StatisticsService) {

    $scope.uniqueChartId = randomId();

    $scope.getChartHeight = function() {
       if($scope.options && $scope.options.height) {
            return $scope.options.height;
       }
       return "350px;";
    };

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
                       data: pieData,
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
               applyCustomOptions(testAvgNumberOfStepsChartOption);
               var testAvgNumberOfStepsChart = echarts.init(document.getElementById($scope.uniqueChartId));
               testAvgNumberOfStepsChart.setOption(testAvgNumberOfStepsChartOption);
           }, 100);
       };

    var applyCustomOptions = function(defaultOptions) {
        if($scope.options) {
            if($scope.options.legend) {
                $.extend(defaultOptions.legend , $scope.options.legend);
            }
            if($scope.options.label && $scope.options.label.show !== undefined) {
                defaultOptions.series[0].itemStyle.normal.label.show = $scope.options.label.show;
                defaultOptions.series[0].itemStyle.normal.labelLine.show = $scope.options.label.show;
            }
            if($scope.options.toolbox) {
                $.extend(defaultOptions.toolbox , $scope.options.toolbox);
            }
            if($scope.options.color) {
                defaultOptions.color = $scope.options.color
            }
        }
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