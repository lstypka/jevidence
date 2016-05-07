reportNgApp.service('ExecutionService', ["$http", "RecordsService", function ($http, RecordsService) {

    this.getExecution = function (executionId, successFn, errorFn) {
        var record = RecordsService.findRecord(executionId);
        var executionFile = 'data/' + record.dirName + '/execution.json';
        $http.get(executionFile).success(function (response) {
            response.id = executionId;
            successFn(response);
        });
    };

}]);