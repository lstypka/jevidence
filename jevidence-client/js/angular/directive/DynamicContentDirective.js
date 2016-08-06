reportNgApp.directive('dynamicContentDirective', ['$compile', '$location',
    function ( $compile, $location ) {

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
                };

                var getPanelWidth = function(width) {
                    if(width) {
                        if(parseInt(width) > 0 && parseInt(width) < 13) {
                            return width;
                        }
                    }
                    return 12;
                }

                var openPanelHtml = function(panelTitle, width, collapsible) {
                    var panelId = Date.now();
                    var html = '<div class="col-md-'+getPanelWidth(width)+'">';
                        html += '   <section class="panel">';
                        html += '       <header class="panel-heading accordion-toggle" data-toggle="collapse" data-target="#'+panelId+'" style="cursor: pointer;">';
                        html += '           <span style="font-weight: bold;">'+panelTitle+'</span>';
                        html += '           <div class="pull-right" title="Minimalize"><i class="fa container-collapse"></i></div>';
                        html += '       </header>';
                        html += '       <div class="panel-body in" id="'+panelId+'">';
                    return html;
                };

                var closePanel = function() {
                    var html  = '        </div>';
                        html += '   </section>';
                        html += '</div>';
                    return html;
                };

                var createDirectiveTags = function(element) {
                    if(element.widgetId === 'calendarWidget') {
                        return "<calendar-directive/>";
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
                        html += openPanelHtml(element.title, element.width, element.collapsible);
                        html += createDirectiveTags(element);
                        html += closePanel();
                    }
                    html += '</div>'; // end row
                }

                    var el = $compile( html )( $scope );
                    $element.parent().append( el );
            }
        }
    }
]);