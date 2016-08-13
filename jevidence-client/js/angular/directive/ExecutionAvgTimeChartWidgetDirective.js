reportNgApp.directive('executionAvgTimeChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12 panel-content" ng-controller="executionAvgTimeChartWidgetCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}};"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionAvgTimeChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-avg-time-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionAvgTimeChartWidget'
    }
}]).controller('executionAvgTimeChartWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'ExecutionService', 'StatisticsService',
                function ($scope, $timeout, $routeParams, ExecutionService, StatisticsService) {

    $scope.uniqueChartId = randomId();

    $scope.getChartHeight = function() {
       if($scope.options && $scope.options.height) {
            return $scope.options.height;
       }
       return "350px;";
    };

    var getExecutionFromOptions = function() {
        if($scope.options && $scope.options.executionId) {
            return $scope.options.executionId;
        }
        return "last";
    };

    $scope.getExecutionId = function(successFn) {
        if($routeParams.executionId) {
             successFn({id : $routeParams.executionId});
        } else {
            ExecutionService.getExecutionByConfigId(getExecutionFromOptions(), successFn);
        }
    };

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
                       data:valueData,
                       itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            }
                       }
                   }
               ]
           };

           $timeout(function(){
               applyCustomOptions(testAvgTimeChartOption);
               var testAvgTimeChartChart = echarts.init(document.getElementById($scope.uniqueChartId));
               testAvgTimeChartChart.setOption(testAvgTimeChartOption);
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
        $scope.getExecutionId(function(execution) {
             StatisticsService.getStatistics(execution.id, function (response) {
                       var testExecutionTime = response.testExecutionTime;

                       for(var i = 0; i < testExecutionTime.ranges.length; i++) {
                           var range = testExecutionTime.ranges[i];
                           valueData.push(range.value);
                           categoryData.push(''+ range.leftRange +'-' + range.rightRange + ' [ms]');
                       }
                       initChart();
                   });
        })
    };

       init();


}]);