reportNgApp.directive('calendarWidgetDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            controller: function ( $scope, $element ) {

                var html  = '<div data-ng-controller="CalendarCtrl">';
                    html += '   <div ui-calendar="uiConfig.calendar" class="span8 calendar" ng-model="eventSources"></div>';
                    html += '</div>';

                var el = $compile( html )( $scope );
                $element.parent().append( el );
            }
        }
    }
]).service('calendarWidgetConfig', [function() {

      return {
          renderHtml: function(options, executionId) {
              return "<calendar-widget-directive/>";
          },
          widgetId: 'calendarWidget'
      }
  }]);