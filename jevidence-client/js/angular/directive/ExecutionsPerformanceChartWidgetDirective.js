reportNgApp.directive('executionsPerformanceChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div ng-controller="ExecutionsPerformanceChartWidgetCtrl">';
                    html += '   <div class="col-md-12 panel-content">';
                    html += '       <div style="border: 1px solid #eee;">';
                    html += '            <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}}"></div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionsPerformanceChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<executions-performance-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionsPerformanceChartWidget'
    }
}]).controller('ExecutionsPerformanceChartWidgetCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

       var executions = [];
       var executionTime = [];

       $scope.uniqueChartId = randomId();

       $scope.getChartHeight = function() {
        if($scope.options && $scope.options.height) {
            return $scope.options.height;
        }
        return "350px;";
       };

       var initChart = function() {

           var testsTrendPerformanceChartOption = {
                   tooltip : {
                       trigger: 'axis',
                       formatter: "Execution({b}) time: {c}ms",
                   },
                   legend: {
                       data : ['Execution time']
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
                   color: ["#B6A2DE"],
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
                           name: 'Time [ms]'
                       }
                   ],
                   series : [
                       {
                           name:'Execution time',
                           type:'line',
                           stack: 'Execution time',
                           itemStyle: {normal: {areaStyle: {type: 'default'}}},
                           data:executionTime
                       }
                   ]
               };

           $timeout(function(){
               applyCustomOptions(testsTrendPerformanceChartOption);
               var testsTrendPerformanceChart = echarts.init(document.getElementById($scope.uniqueChartId));
               testsTrendPerformanceChart.setOption(testsTrendPerformanceChartOption );
           }, 50);
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

       var init = function () {
           RecordsService.getRecords(function (records) {
               for(var i = getFirstExecution(records); i <= getLastExecution(records) ; i++) {
                   if(records.length === 1) {
                       executions.push("#0");
                       executionTime.push(0);
                       executions.push("#"+records[0].id);
                       executionTime.push(records[0].duration);
                   } else {
                       executions.push("#"+records[records.length - 1 - i].id);
                       executionTime.push(records[records.length - 1 - i].duration);
                   }
               }
               initChart();
           }, function(response) {
               $scope.noRecords;
           });
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

       init();
   }]);