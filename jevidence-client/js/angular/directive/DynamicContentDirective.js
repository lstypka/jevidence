reportNgApp.directive('dynamicContentDirective', ['$compile', '$location', 'emptyWidgetConfig', 'calendarWidgetConfig',
    function ( $compile, $location, emptyWidgetConfig, calendarWidgetConfig ) {

        var registeredWidgets = [emptyWidgetConfig, calendarWidgetConfig];

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                window.console.log("Dynamic content");
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

                var openPanelHtml = function(panelTitle, width, collapsible, isEmptyWidget) {
                    var panelId = guid();
                    var html = '<div class="col-md-'+getPanelWidth(width)+'">';
                    if(!isEmptyWidget) {
                        html += '   <section class="panel">';
                        html += '       <header class="panel-heading accordion-toggle" data-toggle="collapse" data-target="#'+panelId+'" style="cursor: pointer;">';
                        html += '           <span style="font-weight: bold;">'+panelTitle+'</span>';
                        html += '           <div class="pull-right" title="Minimalize"><i class="fa container-collapse"></i></div>';
                        html += '       </header>';
                        html += '       <div class="panel-body in" id="'+panelId+'">';
                    }
                    return html;
                };

                var closePanel = function(isEmptyWidget) {
                    var html  = '        </div>';
                    if(!isEmptyWidget) {
                        html += '   </section>';
                        html += '</div>';
                    }
                    return html;
                };

                var createDirectiveTags = function(element, executionId) {
                    for(var i = 0; i < registeredWidgets.length; i++) {
                        if(element.widgetId === registeredWidgets[i].widgetId) {
                            return registeredWidgets[i].renderHtml(element.options, executionId);
                        }
                    }
                };


                // start generate dynamic page content
                var html = '';
                var page = findPage($location.search().page);
                for(var i = 0; i < page.rows.length; i++) {
                    var row = page.rows[i];
                    html += '<div class="row">'; // start row
                    for(var j = 0; j < row.elements.length; j++) {
                        var element = row.elements[j];
                        html += openPanelHtml(element.title, element.width, element.collapsible, element.widgetId === 'emptyWidget');
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