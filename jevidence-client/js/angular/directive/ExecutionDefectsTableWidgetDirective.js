reportNgApp.directive('executionDefectsTableWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html = '<div ng-controller="executionDefectsTableWidgetCtrl">';
                    html += '   <div class="alert alert-success" ng-if="defects.defects.length === 0">';
                    html += '       <strong>Execution {{executionId}}</strong> without any defects!';
                    html += '   </div>';
                    html += '   <div class="panel-body table-responsive" ng-if="defects.defects.length > 0">';
                    html += '       <table class="table table-hover">';
                    html += '           <thead>';
                    html += '               <tr>';
                    html += '                   <th class="col-md-8">Exception</th>';
                    html += '                   <th class="col-md-1">Message</th>';
                    html += '                   <th class="col-md-2"></th>';
                    html += '                   <th class="col-md-1"><span style="float: right;">Count</span></th>';
                    html += '               </tr>';
                    html += '           </thead>';
                    html += '           <tbody>';
                    html += '               <tr ng-repeat-start="defect in defects.defects track by $index" ng-click="toggleRow(defect);" style="cursor: pointer;">';
                    html += '                   <td><i class="fa" ng-class="{\'fa-plus-square-o\' : !defect.expanded, \'fa-minus-square-o\' : defect.expanded}"></i>';
                    html += '                       <spam style="margin-left: 10px;">{{defect.exceptionClassName}}</spam>';
                    html += '                   </td>';
                    html += '                   <td colspan="2">{{defect.exceptionMessage}}</td>';
                    html += '                   <td><span class="label label-test-error" style="float: right;">{{calculateNumberOfTests(defect)}}</span></td>';
                    html += '               </tr>';
                    html += '               <tr ng-repeat-start="test in defect.tests" ng-if="defect.expanded">';
                    html += '                   <td colspan="2">';
                    html += '                       <a ng-href="#/execution/{{executionId}}/result?testname={{test.className}}.{{test.testName}}&params={{stringify(test.params)}}">';
                    html += '                           <span style="margin-left: 20px; word-wrap: break-word;">&raquo; {{test.className}}.{{test.testName}}</span>';
                    html += '                       </a>';
                    html += '                   </td>';
                    html += '                   <td colspan="2">';
                    html += '                       <div>';
                    html += '                           <span data-ng-repeat="(paramKey, paramValue) in test.params" class="label-test-param" style="background-color: white; margin-left: 5px;">{{paramKey}} : {{paramValue}}</span>';
                    html += '                       </div>';
                    html += '                   </td>';
                    html += '               </tr>';
                    html += '               <tr ng-repeat-end="">';
                    html += '               <tr ng-repeat-end="">';
                    html += '               </tr>';
                    html += '           </tbody>';
                    html += '        </table>';
                    html += '    </div>';
                    html += '</div>';


                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionDefectsTableWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-defects-table-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionDefectsTableWidget'
    }
}]).controller('executionDefectsTableWidgetCtrl',  ['$scope', '$timeout', '$routeParams', 'ExecutionService', 'DefectsService',
                function ($scope, $timeout, $routeParams, ExecutionService, DefectsService) {

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
            $scope.executionId = execution.id;
            DefectsService.getDefects(execution.id, function (response) {
                $scope.defects = response;
            });
        });
    };

    init();

    $scope.calculateNumberOfTests = function (defect) {
        return defect.tests.length;
    };

    $scope.toggleRow = function (defect) {
        defect.expanded = !defect.expanded;
    };

    $scope.stringify = function (value) {
        return value ? JSON.stringify(value) : '';
    };

}]);