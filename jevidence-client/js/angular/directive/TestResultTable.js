reportNgApp.directive('testsResultTable', ['S2StatusService',
    function (S2StatusService) {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                execution: '=',
                allowedStatuses: '=',
                showSearchPanel: '='
            },
            templateUrl: 'view/testsResultTableTemplate.html',
            link: function (scope, element, attrs, ctrl, transclude) {

                scope.s2statuses = S2StatusService;

                if(scope.showSearchPanel === undefined) {
                    scope.showSearchPanel = true;
                }

                scope.search = {
                    textSearch : ''
                };

                scope.successLevel = true;
                scope.infoLevel = true;
                scope.warnLevel = true;
                scope.screenshotLevel = true;
                scope.errorLevel = true;

                scope.toggleStatus = function(level) {
                    scope[level] = !scope[level];
                };

                scope.shouldDisplayStep = function(step) {
                    return scope[step.level + 'Level'];
                };

                scope.itemArray = scope.allowedStatuses;

                scope.selected = { value: scope.itemArray[scope.itemArray.length - 1] };

                attrs.$observe("selectedStatus", function (changedValue) {
                    if (changedValue) {
                        for (var i = 0; i < scope.itemArray.length; i++) {
                            if (changedValue === scope.itemArray[i].label) {
                                scope.selected = { value: scope.itemArray[i] };
                            }
                        }
                    }
                });

                scope.calculateNumberOfTests = function (testClass, status) {
                    var quantity = 0;
                    for (var i = 0; i < testClass.tests.length; i++) {
                        if (testClass.tests[i].status === status && testClass.tests[i].statusOk && testClass.tests[i].textOk) {
                            quantity++;
                        }
                    }
                    return quantity;
                };

                scope.toggleRow = function (row) {
                    if (row.expanded) {
                        row.expanded = false;
                        if (row.tests) {
                            for (var i = 0; i < row.tests.length; i++) {
                                row.tests[i].expanded = false;
                            }
                        }
                    } else {
                        row.expanded = true;
                    }
                };

                 scope.$emit('REFRESH_TOOLTIPS', { });
            }
        }
    }
]);