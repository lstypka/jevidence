reportNgApp.directive('executionStatisticsTableWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html = '<section class="panel tasks-widget">';
                    html = '    <div class="task-content" ng-controller="executionStatisticsTableWidgetCtrl">';
                    html += '      <ul class="task-list">';
                    html += '           <li ng-repeat="(key, value) in statistics">';
                    html += '               <div class="task-title">';
                    html += '                   <span class="task-title-sp">{{key}}</span>';
                    html += '                   <span class="label-test-param pull-right">{{value}}</span>';
                    html += '               </div>';
                    html += '           </li>';
                    html += '       </ul>';
                    html += '   </div>';
                    html += '</section>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionStatisticsTableWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-statistics-table-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionStatisticsTableWidget'
    }
}]).controller('executionStatisticsTableWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'ExecutionService', 'StatisticsService',
                function ($scope, $timeout, $routeParams, ExecutionService, StatisticsService) {


    var filter = function() {
        if($scope.options && $scope.options.whiteList) {
            var newList = {};
            for(var i = 0; i < $scope.options.whiteList.length; i++) {
                newList[$scope.options.whiteList[i]] = $scope.statistics[$scope.options.whiteList[i]];
            }
            $scope.statistics = newList;
        }
        if($scope.options && $scope.options.blackList) {
             for(var i = 0; i < $scope.options.blackList.length; i++) {
                delete $scope.statistics[$scope.options.blackList[i]]
             }
        }
    };

    var calculateStatistics = function (execution) {
        $scope.statistics = {};
        $scope.statistics['Number of classes'] =  execution.testClasses.length;

        var numberOfTests = 0;
        var numberOfSteps = 0;
        var assertionErrors = 0;
        var otherErrors = 0;
        for (var i = 0; i < execution.testClasses.length; i++) {
            numberOfTests += execution.testClasses[i].tests.length;
            for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                numberOfSteps += execution.testClasses[i].tests[j].steps.length;
                for(var k = 0; k < execution.testClasses[i].tests[j].steps.length; k++) {
                    if(execution.testClasses[i].tests[j].steps[k].level === "error") {
                        if(execution.testClasses[i].tests[j].steps[k].assertionError) {
                            assertionErrors++;
                        } else {
                            otherErrors++;
                        }
                    }
                }
            }
        }
        $scope.statistics['Number of tests'] = numberOfTests;
        $scope.statistics['Number of steps'] = numberOfSteps;
        $scope.statistics['Number of assertion errors'] = assertionErrors;
        $scope.statistics['Number of other errors'] = otherErrors;
        filter();
    };

    var getExecutionFromOptions = function() {
        if($scope.options && $scope.options.execution) {
            return $scope.options.execution;
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

    var init = function () {
        $scope.getExecutionId(function(execution) {
            ExecutionService.getExecution(execution.id, function (response) {
                $scope.execution = response;
                calculateStatistics(response);
            });
        });
    };

    init();

}]);