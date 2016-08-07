reportNgApp.directive('emptyWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {
                var html  = '';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('emptyWidgetConfig', [function() {

    return {
        renderHtml: function(options, executionId) {
            return "<empty-widget-directive/>";
        },
        widgetId: 'emptyWidget'
    }
}]);