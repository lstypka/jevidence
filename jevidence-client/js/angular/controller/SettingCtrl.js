reportNgApp.controller('SettingCtrl', ["$scope", "SettingsService",
    function ($scope, SettingsService) {

        $scope.save = function() {
            SettingsService.saveConfiguration($scope.config);
            location.reload();
        };

        $scope.loadDefault = function() {
            $scope.config = JSON.stringify(SettingsService.loadDefaultConfiguration(), undefined, 4);
        };

        var init = function() {
            $scope.config = JSON.stringify(SettingsService.loadConfiguration(), undefined, 4);
        };

        init();
    }]);