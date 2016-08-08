reportNgApp.controller('TestsTrendStatusChartCtrl', ["$scope", "$timeout", "RecordsService", function ($scope, $timeout, RecordsService) {

    var dataSuccess = [];
    var dataFailed = [];
    var dataError = [];
    var dataSkipped = [];
    var categories = ['Success', 'Failed', 'Error', 'Skipped'];
    var executions = [];

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
            var testAvgTimeChartChart = echarts.init(document.getElementById('testsTrendDashboardChart'));
            testAvgTimeChartChart.setOption(testAvgTimeChartOption );
        }, 100);
    };

    var init = function () {
        RecordsService.getRecords(function (records) {
            for (var i = records.length - 1; i >= 0; i--) {
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
                    executions.push("#" + records[i].id);
                    dataSuccess.push(records[i].success);
                    dataError.push(records[i].failed);
                    dataFailed.push(records[i].error);
                    dataSkipped.push(records[i].skipped);
                }
            }
            initChart();
        }, function (response) {
            $scope.noRecords;
        });

    };

    init();

}]);