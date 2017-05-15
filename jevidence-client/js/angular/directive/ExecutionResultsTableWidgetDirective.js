reportNgApp.directive('executionResultsTableWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html = '<div ng-controller="executionResultsTableWidgetCtrl">';
                   html += '<div class="row">';
                    html += '   <div class="col-md-1"></div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix" style="cursor: pointer;" ng-click="selectStatus(\'All\')">';
                    html += '           <span class="sm-st-icon added-gradient"><i class="fa fa-plus-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.skipped + execution.passed + execution.errors + execution.failed}}</span>';
                    html += '               Total tests';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix" style="cursor: pointer;" ng-click="selectStatus(\'Success\')">';
                    html += '           <span class="sm-st-icon success-gradient"><i class="fa fa-check-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.passed}}</span>';
                    html += '               Passed';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix" style="cursor: pointer;" ng-click="selectStatus(\'Failed\')">';
                    html += '           <span class="sm-st-icon failed-gradient"><i class="fa fa-times-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.failed}}</span>';
                    html += '               Failed';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '    <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix" style="cursor: pointer;" ng-click="selectStatus(\'Error\')">';
                    html += '           <span class="sm-st-icon errors-gradient" style="background-color: #b5302c;"><i class="fa fa-dot-circle-o"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.errors}}</span>';
                    html += '               Errors';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '   <div class="col-md-2">';
                    html += '       <div class="sm-st clearfix" style="cursor: pointer;" ng-click="selectStatus(\'Skipped\')">';
                    html += '           <span class="sm-st-icon skipped-gradient"><i class="fa fa-minus-circle"></i></span>';
                    html += '           <div class="sm-st-info">';
                    html += '               <span>{{execution.skipped}}</span>';
                    html += '               Skipped';
                    html += '           </div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';
                    html += '<tests-result-table selected-status="{{selectedStatus}}" execution="execution" allowed-statuses="allowedStatuses" show-search-panel="showSearchPanel"/>';
                    html += '</div>';


                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionResultsTableWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<execution-results-table-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionResultsTableWidget'
    }
}]).controller('executionResultsTableWidgetCtrl',  ['$scope', '$location', '$routeParams', 'ExecutionService',
                function ($scope, $location, $routeParams, ExecutionService) {


    $scope.allowedStatuses = [
        {id: 0, style: 'test-error', label: "Error"},
        {id: 1, style: 'test-failed', label: 'Failed'},
        {id: 2, style: 'test-success', label: 'Success'},
        {id: 3, style: 'test-skipped', label: 'Skipped'},
        {id: 4, style: 'test-default', label: 'All'}];

    $scope.selectStatus = function (status) {
        $scope.selectedStatus = status;
        $scope.$emit('REFRESH_TOOLTIPS', { });
    };

    var filterResults = function (execution) {
        var testName = $location.search().testname;
        var params = $location.search().params;
        if (testName) {
            for (var i = 0; i < execution.testClasses.length; i++) {
                for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                    if (testName === (execution.testClasses[i].name + '.' + execution.testClasses[i].tests[j].name)) {
                        if ((params && params === JSON.stringify(execution.testClasses[i].tests[j].params)) || (!params && !execution.testClasses[i].tests[j].params)) {
                            var result = execution;
                            execution.testClasses[i].tests[j].expanded = true;
                            execution.testClasses[i].tests = [execution.testClasses[i].tests[j]];
                            result.testClasses = [execution.testClasses[i]];
                            result.testClasses[0].expanded = true;
                            return result;
                        }
                    }
                }
            }
        }

        return execution;
    };

    var init = function () {
        $scope.showSearchPanel = !$location.search().testname;
        ExecutionService.getExecution($routeParams.executionId, function (response) {
            $scope.execution = filterResults(response);
        });
    };


    init();

}]);