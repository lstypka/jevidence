reportNgApp.directive('testsTrendChartWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {
                var html  = '<div class="col-md-12" ng-controller="TestsTrendStatusChartCtrl">';
                    html += '   <div style="border: 1px solid #eee;">';
                    html += '       <div id="testsTrendDashboardChart" style="min-height: 350px;"></div>';
                    html += '   </div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('testsTrendChartWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<tests-trend-chart-widget-directive/>";
        },
        widgetId: 'testsTrendChartWidget'
    }
}]);