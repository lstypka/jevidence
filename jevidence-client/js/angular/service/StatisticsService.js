reportNgApp.service('StatisticsService', ["$http", "RecordsService", function ($http, RecordsService) {

    this.getStatistics = function (executionId, successFn) {
        var record = RecordsService.findRecord(executionId);
        var executionFile = 'data/' + record.dirName + '/statistics.json';
        $http.get(executionFile).success(function (response) {
            response.id = executionId;
            successFn(response);
        });
    };

}]);