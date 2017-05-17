reportNgApp.directive('dynamicContentDirective', ['$compile', '$routeParams', '$location', 'RecordsService', 'ExecutionService', 'SettingsService',
                           'emptyWidgetConfig', 'calendarWidgetConfig', 'testsTrendChartWidgetConfig', 'testsResultListWidgetConfig', 'testsResultComparatorWidgetConfig',
                           'executionsPerformanceChartWidgetConfig', 'testsAvgDurationChartWidgetConfig', 'executionResultInPercentageChartWidgetConfig',
                           'executionAvgNumberOfStepsChartWidgetConfig', 'executionAvgTimeChartWidgetConfig', 'executionStatisticsTableWidgetConfig',
                           'executionEnvironmentVariablesTableWidgetConfig', 'executionParamsTableWidgetConfig', 'executionDefectsTableWidgetConfig',
                           'executionOverviewWidgetConfig', 'executionResultsTableWidgetConfig',
    function ( $compile, $routeParams, $location, RecordsService, ExecutionService, SettingsService, emptyWidgetConfig, calendarWidgetConfig, testsTrendChartWidgetConfig,
                testsResultListWidgetConfig, testsResultComparatorWidgetConfig, executionsPerformanceChartWidgetConfig, testsAvgDurationChartWidgetConfig,
                executionResultInPercentageChartWidgetConfig, executionAvgNumberOfStepsChartWidgetConfig, executionAvgTimeChartWidgetConfig,
                executionStatisticsTableWidgetConfig, executionEnvironmentVariablesTableWidgetConfig, executionParamsTableWidgetConfig,
                executionDefectsTableWidgetConfig, executionOverviewWidgetConfig, executionResultsTableWidgetConfig) {

        var registeredWidgets = [emptyWidgetConfig, calendarWidgetConfig, testsTrendChartWidgetConfig, testsResultListWidgetConfig,
                                testsResultComparatorWidgetConfig, executionsPerformanceChartWidgetConfig, testsAvgDurationChartWidgetConfig,
                                executionResultInPercentageChartWidgetConfig, executionAvgNumberOfStepsChartWidgetConfig,
                                executionAvgTimeChartWidgetConfig, executionStatisticsTableWidgetConfig, executionEnvironmentVariablesTableWidgetConfig,
                                executionParamsTableWidgetConfig, executionDefectsTableWidgetConfig, executionOverviewWidgetConfig,
                                executionResultsTableWidgetConfig];

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {

                var findPage = function(pageId) {
                    if(!pageId) {
                        pageId = 'index';
                    }
                    var pages = SettingsService.loadConfiguration().pages;
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

                var getPanelWidth = function(width) {
                    if(width) {
                        if(parseInt(width) > 0 && parseInt(width) < 13) {
                            return width;
                        }
                    }
                    return 12;
                }

                var formatTitle = function(title, options) {
                    title = title || "";
                    if(title.indexOf('${executionId}') !== -1) {
                        if($routeParams.executionId) {
                            title = title.replace("${executionId}", $routeParams.executionId);
                        } else if(options) {
                            if(options.execution) {
                                 ExecutionService.getExecutionByConfigId(options.execution, function(execution){
                                     title = title.replace("${executionId}", execution.id);
                                 });
                            }
                        }
                    }
                    if(title.indexOf('${numberOfExecutions}') !== -1) {
                       RecordsService.getRecords(function(records) {
                           title = title.replace("${numberOfExecutions}", records.length);
                       });
                    }
                    return title;
                };

                var openPanelHtml = function(panelTitle, width, collapsible, isEmptyWidget, options) {
                    var panelId = randomId();
                    var html = '<div class="container col-md-'+getPanelWidth(width)+'">';
                    if(!isEmptyWidget) {
                        html += '   <section class="panel tasks-widget">';
                        html += '       <header class="panel-heading accordion-toggle" data-toggle="collapse" data-target="#'+panelId+'" style="cursor: pointer;">';
                        html += '           <span class="header-title">'+formatTitle(panelTitle, options)+'</span>';
                        html += '           <div class="pull-right minimalize" title="Minimalize"><i class="fa container-collapse"></i></div>';
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

                var extendElement = function(element) {
                    if(element.extends) {
                        var pages = SettingsService.loadConfiguration().pages;
                        for(var i = 0; i < pages.length; i++) {
                            var page = pages[i];
                            for(var j = 0; j < page.rows.length; j++) {
                                var row = page.rows[j];
                                for(var k = 0; k < row.elements.length; k++) {
                                    var e = row.elements[k];
                                    if(e.id === element.extends) {
                                        var extendedElement = {};
                                        $.extend( extendedElement , e, element);
                                        return  extendedElement ;
                                    }
                                }
                            }
                        }
                    }
                    return element;
                };


                // start generate dynamic page content
                var html = '';
                var page = findPage($location.search().page);
                for(var i = 0; i < page.rows.length; i++) {
                    var row = page.rows[i];
                    html += '<div class="row">'; // start row
                    for(var j = 0; j < row.elements.length; j++) {
                        var element = row.elements[j];
                        element = extendElement(element);
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