reportNgApp.directive('testsAvgDurationChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12 panel-content" ng-controller="testsAvgDurationChartWidgetCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}};"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('testsAvgDurationChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<tests-avg-duration-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'testsAvgDurationChartWidget'
    }
}]).controller('testsAvgDurationChartWidgetCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

       var executions = [];
       var avgExecutionTime = [];
       $scope.uniqueChartId = randomId();

       $scope.getChartHeight = function() {
            if($scope.options && $scope.options.height) {
                return $scope.options.height;
            }
            return "350px;";
       };

        var applyCustomOptions = function(defaultOptions) {
           if($scope.options) {
               if($scope.options.chartTitle) {
                   defaultOptions.legend.data = [$scope.options.chartTitle];
                   defaultOptions.series[0].name = $scope.options.chartTitle;
                   defaultOptions.series[0].stack = $scope.options.chartTitle;
               }
               if($scope.options.xAxisTitle) {
                   defaultOptions.xAxis[0].name = $scope.options.xAxisTitle;
               }
               if($scope.options.yAxisTitle) {
                   defaultOptions.yAxis[0].name = $scope.options.yAxisTitle;
               }
               if($scope.options.color) {
                   defaultOptions.color = [$scope.options.color];
               }
               if($scope.options.toolbox) {
                   defaultOptions.toolbox = $scope.options.toolbox;
               }
               if($scope.options.legend && $scope.options.legend.show != undefined) {
                    defaultOptions.legend.show = $scope.options.legend.show;
               }
           }
       };

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
                 applyCustomOptions(testsAvgTimeTrendPerformanceChartOption);
                 var testsAvgTimeTrendPerformanceChart = echarts.init(document.getElementById($scope.uniqueChartId));
                 testsAvgTimeTrendPerformanceChart.setOption(testsAvgTimeTrendPerformanceChartOption );
             }, 100);
         };

        var getFirstExecution = function(records) {
           if($scope.options && $scope.options.range) {
               if($scope.options.range.indexOf('last') !== -1) {
                   var delta = parseRange($scope.options.range);
                   var start = records.length - delta;
                   return start >= 0 ? start : 0;
               } else if($scope.options.range.indexOf('first') !== -1) {
                   return 0;
               }
           }
           return 0;
       };

       var getLastExecution = function(records) {
           if($scope.options && $scope.options.range) {
               if($scope.options.range.indexOf('last') !== -1) {
                   return records.length - 1;
               } else if($scope.options.range.indexOf('first') !== -1) {
                    var delta = parseRange($scope.options.range) - 1;
                    return delta < records.length - 1 ? delta : records.length - 1;
               }
           }
           return records.length - 1;
       };

       var parseRange = function(range) {
           var value = parseInt(range.split(" ")[1]);
           return value > 0 ? value : 1;
       };

         var init = function () {
             RecordsService.getRecords(function (records) {
                  for(var i = getFirstExecution(records); i <= getLastExecution(records) ; i++) {
                     if(records.length === 1) {
                         executions.push("#0");
                         avgExecutionTime.push(0);

                         executions.push("#"+records[i].id);
                         var avg = records[i].duration / (records[i].success + records[i].skipped + records[i].failed + records[i].error);
                         avgExecutionTime.push(avg);
                     } else {
                         executions.push("#"+records[records.length - 1 - i].id);
                         var avg = records[records.length - 1 - i].duration / (records[records.length - 1 - i].success + records[records.length - 1 - i].skipped + records[records.length - 1 - i].failed + records[records.length - 1 - i].error);
                         avgExecutionTime.push(avg);
                     }
                 }
                 initChart();
             }, function(response) {
                 $scope.noRecords;
             });

         };

         init();

   }]);