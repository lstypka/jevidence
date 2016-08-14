reportNgApp.directive('executionEnvironmentVariablesTableWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html = '<section class="panel tasks-widget">';
                    html = '    <div class="task-content" ng-controller="executionEnvironmentVariablesTableWidgetCtrl">';
                    html += '      <ul class="task-list">';
                    html += '           <li ng-repeat="(key, value) in environmentVariables">';
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
]).service('executionEnvironmentVariablesTableWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-environment-variables-table-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionEnvironmentVariablesTableWidget'
    }
}]).controller('executionEnvironmentVariablesTableWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'ExecutionService', 'StatisticsService',
                function ($scope, $timeout, $routeParams, ExecutionService, StatisticsService) {

    var filter = function() {
        if($scope.options && $scope.options.whiteList) {
            var newList = {};
            for(var i = 0; i < $scope.options.whiteList.length; i++) {
                newList[$scope.options.whiteList[i]] = $scope.environmentVariables[$scope.options.whiteList[i]];
            }
            $scope.environmentVariables = newList;
        }
        if($scope.options && $scope.options.blackList) {
             for(var i = 0; i < $scope.options.blackList.length; i++) {
                delete $scope.environmentVariables[$scope.options.blackList[i]]
             }
        }
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
       window.console.log("Responsessss");
        $scope.getExecutionId(function(execution) {
            ExecutionService.getExecution(execution.id, function (response) {
                $scope.environmentVariables = {};
                if(response.environmentVariables) {
                    for(var i = 0; i < response.environmentVariables.length; i++) {
                        $scope.environmentVariables[response.environmentVariables[i].key] = response.environmentVariables[i].value;
                    }
                }
                filter();
            });
        });

    };

    init();

}]);