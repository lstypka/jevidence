reportNgApp.service('DefectsService', ["$http", "RecordsService", function ($http, RecordsService) {

    this.getDefects = function (executionId, successFn) {
        var record = RecordsService.findRecord(executionId);
        var executionFile = 'data/' + record.dirName + '/defects.json';
        $http.get(executionFile).success(function (response) {
            response.id = executionId;
            successFn(response);
        });
    };

}]);