reportNgApp.directive('dynamicContentDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                window.console.log("Dynamic content");
            },
            controller: function ( $scope, $element ) {
                    var el = $compile( "<h1>YEAHHHH ! ! ! </h1>" )( $scope );
                    $element.parent().append( el );
            }
        }
    }
]);