reportNgApp.directive('dynamicContentDirective', ['$compile', '$location', 'RecordsService', 'ExecutionService', 'emptyWidgetConfig',
                           'calendarWidgetConfig', 'testsTrendChartWidgetConfig', 'testsResultListWidgetConfig', 'testsResultComparatorWidgetConfig',
    function ( $compile, $location, RecordsService, ExecutionService, emptyWidgetConfig, calendarWidgetConfig, testsTrendChartWidgetConfig, testsResultListWidgetConfig, testsResultComparatorWidgetConfig ) {

        var registeredWidgets = [emptyWidgetConfig, calendarWidgetConfig, testsTrendChartWidgetConfig, testsResultListWidgetConfig, testsResultComparatorWidgetConfig];

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {

                var findPage = function(pageId) {
                    var pages = jEvidenceLayoutConfig.pages;
                    for(var i = 0; i < pages.length; i++) {
                        if(pageId === pages[i].id) {
                            return pages[i];
                        }
                    }
                    return {
                        id : "empty page",
                        rows : []
                    };
                };

                function guid() {
                  function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                  }
                  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                }

                var getPanelWidth = function(width) {
                    if(width) {
                        if(parseInt(width) > 0 && parseInt(width) < 13) {
                            return width;
                        }
                    }
                    return 12;
                }

                var formatTitle = function(title, options) {
                    if(options) {
                        if(options.execution) {
                            if(title.indexOf('${executionId}') !== -1) {
                                 var executionId = ExecutionService.getExecutionByConfigId(options.execution, function(execution){
                                     title = title.replace("${executionId}", execution.id);
                                 });
                            }
                        }
                    }
                    return title;
                };

                var openPanelHtml = function(panelTitle, width, collapsible, isEmptyWidget, options) {
                    var panelId = guid();
                    var html = '<div class="container col-md-'+getPanelWidth(width)+'">';
                    if(!isEmptyWidget) {
                        html += '   <section class="panel">';
                        html += '       <header class="panel-heading accordion-toggle" data-toggle="collapse" data-target="#'+panelId+'" style="cursor: pointer;">';
                        html += '           <span style="font-weight: bold;">'+formatTitle(panelTitle, options)+'</span>';
                        html += '           <div class="pull-right" title="Minimalize"><i class="fa container-collapse"></i></div>';
                        html += '       </header>';
                        html += '       <div class="panel-body in" id="'+panelId+'">';
                    }
                    return html;
                };

                var closePanel = function(isEmptyWidget) {
                    var html  = '       </div>';
                    if(!isEmptyWidget) {
                        html += '   </section>';
                        html += '</div>';
                    }
                    return html;
                };

                var createDirectiveTags = function(element, executionId) {
                    for(var i = 0; i < registeredWidgets.length; i++) {
                        if(element.widgetId === registeredWidgets[i].widgetId) {
                            return registeredWidgets[i].renderHtml(JSON.stringify(element.options), executionId);
                        }
                    }
                };

                var defaultOptionsIfNeeded = function(options) {
                    if(!options) {
                        options = {};
                    }
                    if(!options.execution) {
                        options.execution = 'last';
                    }
                }


                // start generate dynamic page content
                var html = '';
                var page = findPage($location.search().page);
                for(var i = 0; i < page.rows.length; i++) {
                    var row = page.rows[i];
                    html += '<div class="row">'; // start row
                    for(var j = 0; j < row.elements.length; j++) {
                        var element = row.elements[j];
                        defaultOptionsIfNeeded(element.options);
                        html += openPanelHtml(element.title, element.width, element.collapsible, element.widgetId === 'emptyWidget', element.options);
                        html += createDirectiveTags(element);
                        html += closePanel(element.widgetId === 'emptyWidget');
                    }
                    html += '</div>'; // end row
                }

                    var el = $compile( html )( $scope );
                    $element.parent().append( el );
            }
        }
    }
]);