reportNgApp.directive('menuDirective', ['$compile',
    function ( $compile ) {

        return {
            restrict: 'E',
            transclude: false,
            scope: {
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                window.console.log("Rendering menu");
            },
            controller: function ( $scope, $element ) {

                    var menuElements = jevidenceLayoutConfig.menu;

                    var createMenuLiElement = function(element) {
                          var html = "<li ng-class=\"{'active' : true}\">";
                          if(element.redirect) {
                            html += '<a href="' + element.redirect+ '">'
                          } else {
                            html += '<a href="#/dynamiccontent?page=' + element.id+ '">'
                          }
                          html += '<i class="fa ' + element.icon +'"></i> <span>' + element.name + '</span>';
                          html += '</a>';
                          html += '</li>';
                          html += '<li class="divider"></li>';
                          return html;
                    };

                    var html = '<ul class="sidebar-menu">';

                    for(var i = 0; i < menuElements.length; i++) {
                        html += createMenuLiElement(menuElements[i]);
                    }

                    html += '</ul>';
                    var el = $compile(html)( $scope );
                    $element.parent().prepend( el );
            }
        }
    }
]);