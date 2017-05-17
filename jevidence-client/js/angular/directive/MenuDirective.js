reportNgApp.directive('menuDirective', ['$compile', 'SettingsService',
    function ( $compile, SettingsService ) {

        return {
            restrict: 'E',
            transclude: false,
            scope: {
            },
            link: function (scope, element, attrs, ctrl, transclude) {
            },
            controller: function ( $scope, $element ) {

                    var createMenuLiElement = function(element) {
                          var html = "<li ng-class=\"{'active' : isNodeActive('dynamiccontent?page=" + element.pageId + "')}\">";
                          if(element.redirect) {
                            html += '<a href="' + element.redirect+ '">'
                          } else {
                            html += '<a href="#/dynamiccontent?page=' + element.pageId+ '">'
                          }
                          html += '<i class="fa ' + element.icon +'"></i> <span>' + element.name + '</span>';
                          html += '</a>';
                          html += '</li>';
                          html += '<li class="divider"></li>';
                          return html;
                    };

                    var createExecutionsMenu = function() {
                        var html  = '<li class="treeview executions active">';
                            html += '   <a href="#">';
                            html += '       <span><i class="fa fa-cogs"></i><span> Executions</span></span>';
                            html += '       <i class="fa pull-right"></i>';
                            html += '   </a>';
                            html += '   <ul class="treeview-menu">';
                            html += '       <li class="treeview execution-menu" data-ng-repeat="execution in executions" ng-class="{\'active\' : isExecutionNodeActive(\'dynamiccontent?executionId={{execution.id}}\')}">';
                            html += '           <a href="#">';
                            html += '               <i class="fa fa-hashtag" style="font-weight: normal; font-size: 12px;" data-toggle="tooltip" data-placement="bottom" title="Execution started at: {{formatDirNameToTime(execution.dirName);}}">';
                            html += '               <span style="font-size: 14px; margin-left: 3px;" data-toggle="tooltip" data-placement="bottom"  title="Execution started at: {{formatDirNameToTime(execution.dirName);}}">{{execution.id}}</span></i>';
                            html += '               <span class="badge" data-toggle="tooltip" data-placement="bottom"  title="Percentage:{{execution.percentage}}% Passed:{{execution.success}} Failed:{{execution.failed}} Errors:{{execution.error}} Skipped:{{execution.skipped}}" ng-class="[execution.percentageClass]" style="float: right;">{{execution.percentage}}%</span>';

                            html += '               <ul class="treeview-menu" ng-style="{\'overflow: hidden; display: none;\' : isExecutionNodeActive(\'dynamiccontent?executionId={{execution.id}}\')}">';
                            html += '               <li class="divider" style="margin: 0px;"></li>';
                            for(var i = 0; i < SettingsService.loadConfiguration().menuExecutions.length; i++) {
                                var element = SettingsService.loadConfiguration().menuExecutions[i];

                                html += '               <li class="execution-menu-item" ng-class="{\'inner-li-active\' : isExecutionNodeActive(\'dynamiccontent?executionId={{execution.id}}&page='+ element.pageId +'\')}">';
                                html += '                   <a ng-href="#/dynamiccontent?executionId={{execution.id}}&page='+ element.pageId +'">';
                                html += '                       <i class="fa '+element.icon+'"><span style="margin-left: 4px;">'+element.name+'</span></i>';
                                html += '                   </a>';
                                html += '               </li>';

                            }
                            html += '               <li class="divider" style="margin: 0px;"></li>';
                            html += '               </ul>';
                            html += '           </a>';
                            html += '       </li>';
                            html += '   </ul>';
                            html += '</li>';

                            return html;
                    };

                    var html = '<ul class="sidebar-menu" data-ng-controller="MenuCtrl">';

                    for(var i = 0; i < SettingsService.loadConfiguration().menu.length; i++) {
                        html += createMenuLiElement(SettingsService.loadConfiguration().menu[i]);
                    }
                    html += createExecutionsMenu();
                    html += '</ul>';
                    var el = $compile(html)( $scope );
                    $element.parent().prepend( el );
            }
        }
    }
]);