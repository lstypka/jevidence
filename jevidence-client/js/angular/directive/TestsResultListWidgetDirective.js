reportNgApp.directive('testsResultListWidgetDirective', ['$compile',
    function ( $compile ) {

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
                    html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test, testIndex);" /></td>';
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
}]).controller('testsResultListWidgetCtrl', ['$scope', '$filter', 'ExecutionService', function($scope, $filter, ExecutionService){

    var availableColumns = ["id", "testName", "shortName", "fullName", "duration", "status", "startedAt", "finishedAt", "params"];

    var init = function() {
         $scope.columns = $scope.options.columns;
         // remove unknown columns
         for(var i = $scope.columns.length; i >=0 ; i--) {
            if(availableColumns.indexOf($scope.columns[i])=== -1) {
                $scope.columns.splice(i, 1);
            }
         }

         // create execution set
         ExecutionService.getExecutionId($scope.options.execution, function(executionId){
            $scope.executionId = executionId;
            ExecutionService.getExecutionSet(executionId, function(executionSet) {
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
        if(column === 'testName' || column === 'fullName' || column === 'shortName') {
            var params = encodeURIComponent(JSON.stringify(test['params']));
            return '<a href="#/execution/'+$scope.executionId+'/result?testname='+test['fullName']+'&params='+params+'" title='+test[column]+'>'+test[column]+'</a>';
        }
        if(column === 'duration') {
            var duration = $filter('timeDurationFilter')(test['duration']);
            return '<span title="'+duration+'">'+duration+'</span>';
        }
        if(column === 'status') {
            if(test.status === 'SUCCESS') {
                return '<span class="label label-block label-test-success">SUCCESS</span>';
            }
            if(test.status === 'FAILED') {
                return '<span class="label label-block label-test-failed">FAILED</span>';
            }
            if(test.status === 'ERROR') {
                return '<span class="label label-block label-test-error">ERROR</span>';
            }
            if(test.status === 'SKIPPED') {
                return '<span class="label label-block label-test-skipped">SKIPPED</span>';
            }
        }
        if(column === 'params') {
            var params = test.params;
            if(params) {
                var html = '';
                Object.keys(params).forEach(function(key,index) {
                    html += '<span class="label-test-param" style="background-color: white; margin-left: 5px;" title="'+key+' : '+params[key]+'">'+key+' : '+params[key]+'</span>';
                });
                return html;
            }
        }
        return test[column];
    };

    init();

}]);