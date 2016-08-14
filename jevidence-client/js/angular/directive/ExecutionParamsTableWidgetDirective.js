reportNgApp.directive('executionParamsTableWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html = '<section class="panel tasks-widget">';
                    html = '    <div class="task-content" ng-controller="executionParamsTableWidgetCtrl">';
                    html += '      <ul class="task-list">';
                    html += '           <li ng-repeat="(key, values) in params">';
                    html += '               <div class="task-title">';
                    html += '                   <span class="task-title-sp">{{key}}</span>';
                    html += '                   <span ng-repeat="value in values" class="label-test-param pull-right" style="background-color: white; margin-left: 5px;">{{value}}</span></div>';
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
]).service('executionParamsTableWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-params-table-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionParamsTableWidget'
    }
}]).controller('executionParamsTableWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'ExecutionService', 'StatisticsService',
                function ($scope, $timeout, $routeParams, ExecutionService, StatisticsService) {


    var filter = function() {
        if($scope.options && $scope.options.whiteList) {
            var newList = {};
            for(var i = 0; i < $scope.options.whiteList.length; i++) {
                newList[$scope.options.whiteList[i]] = $scope.params[$scope.options.whiteList[i]];
            }
            $scope.params = newList;
        }
        if($scope.options && $scope.options.blackList) {
             for(var i = 0; i < $scope.options.blackList.length; i++) {
                delete $scope.params[$scope.options.blackList[i]]
             }
        }
    };

    var prepareParams = function (execution) {
        var transformedParams = {};
        for (var i = 0; i < execution.testClasses.length; i++) {
            for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                var params = execution.testClasses[i].tests[j].params;
                for (var property in params) {
                    if (params.hasOwnProperty(property)) {
                        var arrayOfParams = transformedParams[property];
                        if (!arrayOfParams) {
                            transformedParams[property] = [params[property]];
                        } else {
                            // check if param already exist
                            var found = false;
                            for (var k = 0; k < arrayOfParams.length; k++) {
                                if (arrayOfParams[k] === params[property]) {
                                    found = true;
                                }
                            }
                            if (!found) {
                                transformedParams[property].push(params[property]);
                            }
                        }
                    }
                }
            }
        }
        $scope.params = transformedParams;
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
                prepareParams(response);
            });
        });
    };

    init();

}]);