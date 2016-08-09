reportNgApp.directive('testsResultComparatorWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : "="
            },
            controller: function ( $scope, $element ) {
                var html  = '';

                // render tiles
                html += '<div ng-controller="testsResultComparatorWidgetCtrl">';
                html += '   <div class="row" ng-show="options.tiles">';
                html += '       <div class="col-md-2">';
                html += '           <div class="sm-st clearfix">';
                html += '               <span class="sm-st-icon added-gradient"><i class="fa fa-plus-circle"></i></span>';
                html += '                <div class="sm-st-info"><span>{{formatNumber(added)}}</span>Added</div>';
                html += '            </div>';
                html += '       </div>';
                html += '       <div class="col-md-2">';
                html += '           <div class="sm-st clearfix">';
                html += '               <span class="sm-st-icon success-gradient"><i class="fa fa-check-circle"></i></span>';
                html += '               <div class="sm-st-info"><span>{{formatNumber(success)}}</span>Passed</div>';
                html += '           </div>';
                html += '       </div>';
                html += '       <div class="col-md-2">';
                html += '           <div class="sm-st clearfix">';
                html += '               <span class="sm-st-icon failed-gradient"><i class="fa fa-times-circle"></i></span>';
                html += '               <div class="sm-st-info"><span>{{formatNumber(failed)}}</span>Failed</div>';
                html += '           </div>';
                html += '       </div>';
                html += '       <div class="col-md-2">';
                html += '           <div class="sm-st clearfix">';
                html += '               <span class="sm-st-icon errors-gradient"><i class="fa fa-dot-circle-o"></i></span>';
                html += '               <div class="sm-st-info"><span>{{formatNumber(error)}}</span>Error</div>';
                html += '           </div>';
                html += '       </div>';
                html += '       <div class="col-md-2">';
                html += '           <div class="sm-st clearfix">';
                html += '               <span class="sm-st-icon skipped-gradient"><i class="fa fa-minus-circle"></i></span>';
                html += '               <div class="sm-st-info"><span>{{formatNumber(skipped)}}</span>Skipped</div>';
                html += '           </div>';
                html += '       </div>';
                html += '       <div class="col-md-2" ng-show="options.comparator">';
                html += '           <div class="row" style="margin-top: 7px;"><b><center>Compare executions</center></b></div>';
                html += '           <div class="row">';
                html += '               <div class="col-md-6">';
                html += '                   <div class="select2-revisions">';
                html += '                       <div id="firstRevisionInDashboard" name="revision" ui-select2="s2revisions" ng-change="changedRevision()" ng-model="selectedRevisions.first"></div> ';
                html += '                   </div>';
                html += '               </div>';
                html += '               <div class="col-md-6">';
                html += '                   <div class="select2-revisions">';
                html += '                       <div id="secondRevisionInDashboard" name="revision" ui-select2="s2revisions" ng-change="changedRevision()" ng-model="selectedRevisions.second"></div>';
                html += '                   </div>';
                html += '               </div>';
                html += '           </div>';
                html += '       </div>';
                html += '   </div>';
                html += '   <div class="row" ng-show="!options.tiles && options.comparator">';
                html += '       <div class="col-md-5"></div>';
                html += '       <div class="col-md-2">';
                html += '           <div class="row" style="margin-top: 7px;"><b><center>Compare executions</center></b></div>';
                html += '           <div class="row">';
                html += '               <div class="col-md-6">';
                html += '                   <div class="select2-revisions">';
                html += '                       <div id="firstRevisionInDashboard" name="revision" ui-select2="s2revisions" ng-change="changedRevision()" ng-model="selectedRevisions.first"></div> ';
                html += '                   </div>';
                html += '               </div>';
                html += '               <div class="col-md-6">';
                html += '                   <div class="select2-revisions">';
                html += '                       <div id="secondRevisionInDashboard" name="revision" ui-select2="s2revisions" ng-change="changedRevision()" ng-model="selectedRevisions.second"></div>';
                html += '                   </div>';
                html += '               </div>';
                html += '           </div>';
                html += '       </div>';
                html += '   </div>';

                // table
                html += '   <div class="panel-body table-responsive" ng-show="options.table">';
                html += '       <table class="table table-hover">';
                html += '           <thead>';
                html += '               <tr>';
                html += '                   <th ng-repeat="column in columns" style="width:{{renderColumnWidth(column, $index);}};">{{renderColumnName(column);}}</th>';
                html += '               </tr>';
                html += '           </thead>';
                html += '           <tbody>';
                html += '               <tr ng-repeat="test in differences.success">';
                html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test);" /></td>';
                html += '               </tr>';
                html += '               <tr ng-repeat="test in differences.failed">';
                html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test);" /></td>';
                html += '               </tr>';
                html += '               <tr ng-repeat="test in differences.error">';
                html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test);" /></td>';
                html += '               </tr>';
                html += '               <tr ng-repeat="test in differences.skipped">';
                html += '                   <td ng-repeat="column in columns"><div ng-bind-html="renderColumnValue(column, test);" /></td>';
                html += '               </tr>';
                html += '           </tbody>';
                html += '       </table>';
                html += '   </div>';
                html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('testsResultComparatorWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            var safetyOptions = JSON.stringify(angular.extend({
                    firstExecution : "last",
                    secondExecution : "penultimate",
                    columns : ["shortName", "params", "previousStatus", "currentStatus"],
                    widths : [35, 35, 15, 15],
                    tiles: true,
                    table: true,
                    comparator: true
                }, JSON.parse(options)));
            return "<tests-result-comparator-widget-directive options='"+safetyOptions+"'/>";
        },
        widgetId: 'testsResultComparatorWidget'
    }
}]).controller('testsResultComparatorWidgetCtrl', ['$scope', 'RecordsService', 'ExecutionService', 'RendererService', 'S2RevisionsService', function($scope, RecordsService, ExecutionService, RendererService, S2RevisionsService){

    $scope.s2revisions = S2RevisionsService;
    $scope.revisions = [];
    $scope.differences = [];
    $scope.selectedRevisions = {first: {id : null, text: null}, second: {id : null, text: null}};

    $scope.changedRevision = function () {
        if(!$scope.selectedRevisions.first || !$scope.selectedRevisions.second) {
            return;
        }
        $scope.incorrectRevisions = false;
        $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first.id;
        $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second.id;
        executionComparator();
    };

    var executionComparator = function () {
        ExecutionService.getExecutionSet($scope.selectedRevisions.first.id, function(currentExecutionSet){
            ExecutionService.getExecutionSet($scope.selectedRevisions.second.id, function(previousExecutionSet){
                $scope.differences = findDifferences(currentExecutionSet, previousExecutionSet);
                $scope.added = $scope.differences.successCount + $scope.differences.failedCount + $scope.differences.errorCount + $scope.differences.skippedCount;
                $scope.success = $scope.differences.successCount;
                $scope.failed = $scope.differences.failedCount;
                $scope.error = $scope.differences.errorCount;
                $scope.skipped = $scope.differences.skippedCount;
            });
        });
    };


    var prepareRevisions = function (records) {
        for (var i = 0; i < records.length; i++) {
            $scope.revisions.push(records[i].id);
        }
        ExecutionService.getExecutionByConfigId($scope.options.firstExecution, function(firstExecution) {
            ExecutionService.getExecutionByConfigId($scope.options.secondExecution, function(secondExecution) {
                $scope.selectedRevisions.first = {id : firstExecution.id, text: firstExecution};
                $scope.selectedRevisions.firstCorrect = $scope.selectedRevisions.first.id;
                if ($scope.revisions.length > 1) {
                   $scope.selectedRevisions.second = { id : secondExecution.id, text : secondExecution};
                   $scope.selectedRevisions.secondCorrect = $scope.selectedRevisions.second.id;
                }
                $scope.changedRevision();
            });
        });


    };

    $scope.formatNumber = function (number) {
        return number > 0 ? '+' + number : number;
    };

    var modifyCounts = function (differences, diff) {
        if (diff.currentStatus === 'SUCCESS') {
            differences.success.push(diff);
            differences.successCount++;
        } else if (diff.currentStatus === 'ERROR') {
            differences.error.push(diff);
            differences.errorCount++;
        } else if (diff.currentStatus === 'FAILED') {
            differences.failed.push(diff);
            differences.failedCount++;
        } else if (diff.currentStatus === 'SKIPPED') {
            differences.skipped.push(diff);
            differences.skippedCount++;
        }

        if (diff.previousStatus === 'SUCCESS') {
            differences.successCount--;
        } else if (diff.previousStatus === 'ERROR') {
            differences.errorCount--;
        } else if (diff.previousStatus === 'FAILED') {
            differences.failedCount--;
        } else if (diff.previousStatus === 'SKIPPED') {
            differences.skippedCount--;
        }
    };

    var findDifferences = function (currentSet, previousSet) {
        var differences = {
            added: [],
            success: [],
            error: [],
            failed: [],
            skipped: [],
            successCount: 0,
            errorCount: 0,
            failedCount: 0,
            skippedCount: 0
        };
        for (var i = 0; i < currentSet.length; i++) {
            var found = false;
            for (var j = 0; j < previousSet.length; j++) {
                if (currentSet[i].name === previousSet[j].name) {
                   if (JSON.stringify(currentSet[i].params) === JSON.stringify(previousSet[j].params)) {
                       found = true;
                       if (currentSet[i].status === previousSet[j].status) {
                           previousSet.splice(j, 1);
                           break;
                       } else {
                          // different statuses
                          var diff = {
                              name: currentSet[i].fullName,
                              testName: currentSet[i].testName,
                              shortName: currentSet[i].shortName,
                              className: currentSet[i].className,
                              fullName: currentSet[i].fullName,

                              params: currentSet[i].params,
                              currentStatus: currentSet[i].status,
                              previousStatus: previousSet[j].status
                          };
                          modifyCounts(differences, diff);

                          // remove test from previousSet
                          previousSet.splice(j, 1);
                          break;
                       }
                   }
                }
            }
            if (!found) {
               // newly added tests
               var diff = {
                   name: currentSet[i].fullName,
                   testName: currentSet[i].testName,
                   shortName: currentSet[i].shortName,
                   className: currentSet[i].className,
                   fullName: currentSet[i].fullName,
                   params: currentSet[i].params,
                   currentStatus: currentSet[i].status,
                   previousStatus: "UNKNOWN"
               };
               modifyCounts(differences, diff);
               differences.added.push(diff);
            }
        }
        return differences;
    };

    $scope.renderColumnName = function(column) {
       if(column === 'id') {
          return "#";
       }
       if(column === 'currentStatus') {
          return "Execution "+ $scope.selectedRevisions.first.id;
       }
       if(column === 'previousStatus') {
          return "Execution "+ $scope.selectedRevisions.second.id;
       }

       return column;
    };

    $scope.renderColumnWidth = function(column, index) {
       if($scope.options.widths) {
          return $scope.options.widths[index]+ '%';
       }
    };

     $scope.renderColumnValue = function(column, test, index) {
        return RendererService.renderColumnValue(column, test, $scope.selectedRevisions.first.id);
     };

    $scope.stringify = function(value) {
        return JSON.stringify(value);
    };


    var init = function() {
        if(!$scope.options) {
            $scope.options = {};
        }
        $scope.columns = $scope.options.columns;
        $scope.options.tiles = $scope.options.tiles || true;

        RecordsService.getRecords(function (records) {
            prepareRevisions(records);

        });
    };

    init();
}]);