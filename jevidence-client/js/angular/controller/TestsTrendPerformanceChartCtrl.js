reportNgApp.controller('TestsTrendPerformanceChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var executions = [];
    var executionTime = [];

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
            var testsTrendPerformanceChart = echarts.init(document.getElementById('testsTrendPerformanceChart'));
            testsTrendPerformanceChart.setOption(testsTrendPerformanceChartOption );
        }, 100);
    };

    var init = function () {
        RecordsService.getRecords(function (records) {
            for(var i = records.length-1; i >=0 ; i--) {
                if(records.length === 1) {
                    executions.push("#0");
                    executionTime.push(0);
                    executions.push("#"+records[i].id);
                    executionTime.push(records[i].duration);
                } else {
                    executions.push("#"+records[i].id);
                    executionTime.push(records[i].duration);
                }
            }
            initChart();
        }, function(response) {
            $scope.noRecords;
        });
    };

    init();
}]);