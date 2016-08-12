reportNgApp.directive('testsTrendChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12 panel-content" ng-controller="testsTrendChartWidgetCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="{{uniqueChartId}}" style="min-height: {{getChartHeight()}};"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('testsTrendChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<tests-trend-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'testsTrendChartWidget'
    }
}]).controller('testsTrendChartWidgetCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

       var dataSuccess = [];
       var dataFailed = [];
       var dataError = [];
       var dataSkipped = [];
       var categories = ['Success', 'Failed', 'Error', 'Skipped'];
       var executions = [];

       $scope.uniqueChartId = randomId();
       $scope.getChartHeight = function() {
            if($scope.options && $scope.options.height) {
                return $scope.options.height;
            }
            return "350px;";
       };

       var initChart = function() {
           var testAvgTimeChartOption = {
                   tooltip : {
                       trigger: 'axis'
                   },
                   legend: {
                       data : categories
                   },

                   toolbox: {
                       show : true,
                       color: ['#008000', '#5bc0de', '#555', '#555'],
                       feature : {
                           magicType : {show: true, type: ['stack', 'tiled'], title: {stack: 'Stack', tiled: 'Tiled'}},
                           restore : {show: true, title: "Refresh"},
                           saveAsImage : {show: true, title: "Save image"}
                       }
                   },
                   calculable : false,
                   color: ["#008000", "#d9534f", "#8b0000", "#5bc0de"],
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
                           name : 'Number of tests'
                       }
                   ],
                   series : [
                       {
                           name:'Skipped',
                           type:'line',
                           stack: 'Skipped',
                           itemStyle: {normal: {areaStyle: {type: 'default'}}},
                           data:dataSkipped
                       },
                       {
                           name:'Error',
                           type:'line',
                           stack: 'Error',
                           itemStyle: {normal: {areaStyle: {type: 'default'}}},
                           data:dataError
                       },
                       {
                           name:'Failed',
                           type:'line',
                           stack: 'Failed',
                           itemStyle: {normal: {areaStyle: {type: 'default'}}},
                           data:dataFailed
                       },

                        {
                           name:'Success',
                           type:'line',
                           stack: 'Success',
                           itemStyle: {normal: {areaStyle: {type: 'default'}}},
                           data:dataSuccess
                        }
                   ]
               };

           $timeout(function(){
               applyCustomOptions(testAvgTimeChartOption);
               var testAvgTimeChartChart = echarts.init(document.getElementById($scope.uniqueChartId));
               testAvgTimeChartChart.setOption(testAvgTimeChartOption );
           }, 100);
       };

       var applyCustomOptions = function(defaultOptions) {
           if($scope.options) {
               if($scope.options.chartTitle) {
                   defaultOptions.legend.data = $scope.options.chartTitle;
                   for(var i = 0; i < $scope.options.chartTitle.length; i++) {
                        defaultOptions.series[i].name = $scope.options.chartTitle[i];
                        defaultOptions.series[i].stack = $scope.options.chartTitle[i];
                   }
               }
               if($scope.options.xAxisTitle) {
                   defaultOptions.xAxis[0].name = $scope.options.xAxisTitle;
               }
               if($scope.options.yAxisTitle) {
                   defaultOptions.yAxis[0].name = $scope.options.yAxisTitle;
               }
               if($scope.options.color) {
                   defaultOptions.color = $scope.options.color;
               }
               if($scope.options.toolbox) {
                   defaultOptions.toolbox = $scope.options.toolbox;
               }
               if($scope.options.legend && $scope.options.legend.show != undefined) {
                    defaultOptions.legend.show = $scope.options.legend.show;
               }
           }
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
                   if (records.length === 1) {
                       executions.push("#0");
                       dataSuccess.push(0);
                       dataError.push(0);
                       dataFailed.push(0);
                       dataSkipped.push(0);

                       executions.push("#" + records[i].id);
                       dataSuccess.push(records[i].success);
                       dataError.push(records[i].failed);
                       dataFailed.push(records[i].error);
                       dataSkipped.push(records[i].skipped);
                   } else {
                       executions.push("#" + records[records.length - 1 - i].id);
                       dataSuccess.push(records[records.length - 1 - i].success);
                       dataError.push(records[records.length - 1 - i].failed);
                       dataFailed.push(records[records.length - 1 - i].error);
                       dataSkipped.push(records[records.length - 1 - i].skipped);
                   }
               }
               initChart();
           }, function (response) {
               $scope.noRecords;
           });

       };

       init();

   }]);