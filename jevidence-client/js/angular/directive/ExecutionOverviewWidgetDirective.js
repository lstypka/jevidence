reportNgApp.directive('executionOverviewWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {
                var html  = '<div ng-controller="executionOverviewWidgetCtrl">';
                    html += '<div class="row">';
                    html += '   <div class="col-md-12">';
                    html += '        <table class="table table-condensed" style="margin-bottom: 0px;">';
                    html += '           <thead>';
                    html += '               <tr>';
                    html += '                   <td class="col-md-4"><b>Status</b></td>';
                    html += '                   <td class="col-md-3"><b>Started</b></td>';
                    html += '                   <td class="col-md-3"><b>Finished</b></td>';
                    html += '                   <td class="col-md-2"><b>Duration</b></td>';
                    html += '               </tr>';
                    html += '           <tbody>';
                    html += '               <tr>';
                    html += '                   <td>';
                    html += '                       <div class="progress xs progress-striped" style="width: 95%; height: 20px;">';
                    html += '                           <div ng-if="executionStatus(execution) === \'error\'">';
                    html += '                               <div class="progress-bar progress-bar-danger errors-gradient" style="width: 100%">';
                    html += '                                   <b>ERROR</b>';
                    html += '                               </div>';
                    html += '                           </div>';
                    html += '                           <div ng-if="executionStatus(execution) === \'failed\'">';
                    html += '                               <div class="progress-bar progress-bar-warning failed-gradient" style="width: 100%">';
                    html += '                                   <b>FAILED</b>';
                    html += '                               </div>';
                    html += '                           </div>';
                    html += '                           <div ng-if="executionStatus(execution) === \'success\'">';
                    html += '                               <div class="progress-bar progress-bar-success success-gradient" style="width: 100%">';
                    html += '                                   <b>SUCCESS</b>';
                    html += '                               </div>';
                    html += '                           </div>';
                    html += '                       </div>';
                    html += '                   </td>';
                    html += '                   <td>{{execution.startedAt}}</td>';
                    html += '                   <td>{{execution.finishedAt}}</td>';
                    html += '                   <td>{{execution.duration | timeDurationFilter}}</td>';
                    html += '               </tr>';
                    html += '           </tbody>';
                    html += '       </table>';
                    html += '   </div>';
                    html += '</div>';
                    html += '<div class="row">';
                    html += '   <div class="col-md-1"></div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix">';
                    html += '           <span class="sm-st-icon added-gradient"><i class="fa fa-plus-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.skipped + execution.passed + execution.errors + execution.failed}}</span>';
                    html += '               Total tests';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix">';
                    html += '           <span class="sm-st-icon success-gradient"><i class="fa fa-check-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.passed}}</span>';
                    html += '               Passed';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix">';
                    html += '           <span class="sm-st-icon failed-gradient"><i class="fa fa-times-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.failed}}</span>';
                    html += '               Failed';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '    <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix">';
                    html += '           <span class="sm-st-icon errors-gradient" style="background-color: #b5302c;"><i class="fa fa-dot-circle-o"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.errors}}</span>';
                    html += '               Errors';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix">';
                    html += '           <span class="sm-st-icon skipped-gradient"><i class="fa fa-minus-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.skipped}}</span>';
                    html += '               Skipped';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionOverviewWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-overview-widget-directive/>";
        },
        widgetId: 'executionOverviewWidget'
    }
}]).controller('executionOverviewWidgetCtrl', ['$scope', '$routeParams', 'ExecutionService',
               function($scope, $routeParams, ExecutionService){

    $scope.executionStatus = function (execution) {
        if (execution) {
            if (execution.errors > 0) {
                return 'error';
            }
            if (execution.failed > 0) {
                return 'failed';
            }
            return 'success';
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
        $scope.getExecutionId(function(execution) {
            ExecutionService.getExecution(execution.id, function (response) {
               $scope.execution = response;
            });
         });
    };

    init();
}]);