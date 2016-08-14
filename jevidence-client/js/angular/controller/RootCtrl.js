reportNgApp.controller('RootCtrl', ["$scope", "$timeout", "$location", "ExecutionService", "RecordsService",
    function ($scope, $timeout, $location, ExecutionService, RecordsService) {

        var CANNOT_READ_RECORD_FILE = 1;
        $scope.errorStatus = 0;
        $scope.showFooter = true;

        $scope.closeFooter = function() {
            $scope.showFooter = false;
        };

        $scope.hideMenu = function() {
            return jEvidenceLayoutConfig.mode === "dashboard";
        };

        $scope.getMenuWidth = function() {
            return jEvidenceLayoutConfig.mode === "dashboard" ? "margin-left: 0px;" : "margin-left: 165px;";
        };

        var init = function () {
            RecordsService.getRecords(function (records) {
               // think about getting records only once, in the rootCtrl

            }, function(data, status, headers, config) {
                window.console.log("ERROR!!! ", data, status, headers, config);
                $scope.errorStatus = CANNOT_READ_RECORD_FILE;
            });
        };

        init();

        $scope.$on('$routeChangeSuccess', function(next, current) {
          $('[data-toggle="tooltip"]').tooltip({container: 'body'});
          $('.select2-revisions .select2-results').slimScroll({alwaysVisible: true});
          // update menu
            $timeout(function() {
                 var executions = $(".execution-menu");
                 for(var i = 0; i < executions.length; i++) {
                    var execution = $(executions[i]);
                    var treeView = execution.children('.treeview-menu').first();
                    if(execution.hasClass("active")) {
                        treeView.css('display', 'block');
                    }
                 }
                 window.console.log("REFRESH");
             }, 50);
         });

         $scope.$on('REFRESH_TOOLTIPS', function (event, args) {
            $timeout(function() {
                  $('[data-toggle="tooltip"]').tooltip({container: 'body'});
                  $('.select2-revisions .select2-results').slimScroll({alwaysVisible: true});
            }, 500);
         });
    }]);