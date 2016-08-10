reportNgApp.directive('executionsPerformanceChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                options : '='
            },
            controller: function ( $scope, $element ) {
                var html  = '<div ng-controller="TestsTrendPerformanceChartCtrl">';
                    html += '   <div class="col-md-12">';
                    html += '       <div style="border: 1px solid #eee;">';
                    html += '            <div id="{{uniqueChartId}}" style="min-height: 350px;"></div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('executionsPerformanceChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<executions-performance-chart-widget-directive options='"+options+"'/>";
        },
        widgetId: 'executionsPerformanceChartWidget'
    }
}]);