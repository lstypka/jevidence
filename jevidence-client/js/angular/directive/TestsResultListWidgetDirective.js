reportNgApp.directive('testsResultListWidgetDirective', ['$compile', 'RendererService',
    function ( $compile, RendererService ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : "="
            },
            controller: function ( $scope, $element ) {
                var html  = '<div ng-controller="testsResultListWidgetCtrl">';
                    html += '       <table class="table table-hover">';
                    html += '           <thead>';
                    html += '               <tr>';
                    html += '                   <th ng-repeat="column in columns" style="width:{{renderColumnWidth(column, $index);}};">{{renderColumnName(column);}}</th>';
                    html += '               </tr>';
                    html += '           </thead>';
                    html += '           <tbody>';
                    html += '               <tr ng-repeat="test in executionSet track by $index">';
                    html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test);" /></td>';
                    html += '               </tr>';
                    html += '           </tbody>';
                    html += '       </table>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('testsResultListWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<tests-result-list-widget-directive options='"+options+"'/>";
        },
        widgetId: 'testsResultListWidget'
    }
}]).controller('testsResultListWidgetCtrl', ['$scope', '$filter', 'ExecutionService', 'RendererService', function($scope, $filter, ExecutionService, RendererService){

    var availableColumns = ["id", "className", "testName", "shortName", "fullName", "duration", "status", "startedAt", "finishedAt", "params"];

    var init = function() {
         $scope.columns = $scope.options.columns;
         // remove unknown columns
         for(var i = $scope.columns.length; i >=0 ; i--) {
            if(availableColumns.indexOf($scope.columns[i])=== -1) {
                $scope.columns.splice(i, 1);
            }
         }

         // create execution set
         ExecutionService.getExecutionByConfigId($scope.options.execution, function(execution){
            $scope.executionId = execution.id;
            ExecutionService.getExecutionSet($scope.executionId, function(executionSet) {
                $scope.executionSet = executionSet;
                for(var i = 0; i < $scope.executionSet.length; i++) {
                    $scope.executionSet[i].id = i + 1;
                }
            });
         });
    };

    $scope.setTestIndex = function(testIndex) {
        $scope.testIndex = testIndex;
    };

    $scope.renderColumnName = function(column) {
        if(column === 'id') {
            return "#";
        }
        return column;
    };

    $scope.renderColumnWidth = function(column, index) {
        if($scope.options.widths) {
            return $scope.options.widths[index]+ '%';
        }
    };

    $scope.renderColumnValue = function(column, test, index) {
        return RendererService.renderColumnValue(column, test, $scope.executionId);
    };

    init();

}]);