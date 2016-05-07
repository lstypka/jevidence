reportNgApp.controller('ExecutionDefectsCtrl', ["$scope", "$routeParams", "DefectsService", function ($scope, $routeParams, DefectsService) {

    var init = function () {
        $scope.executionId = $routeParams.executionId;
        DefectsService.getDefects($routeParams.executionId, function (response) {
            $scope.defects = response;
        });
    };

    init();

    $scope.calculateNumberOfTests = function (defect) {
        return defect.tests.length;
    };

    $scope.toggleRow = function (defect) {
        defect.expanded = !defect.expanded;
    };

    $scope.stringify = function (value) {
        return JSON.stringify(value);
    };

    $scope.calculateTotalDefects = function (defects) {
        if (!defects) {
            return 0;
        }
        var total = 0;
        for (var i = 0; i < defects.defects.length; i++) {
            total += defects.defects[i].tests.length;
        }
        return total;
    };

}]);