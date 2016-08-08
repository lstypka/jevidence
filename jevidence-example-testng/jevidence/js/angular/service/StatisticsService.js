reportNgApp.service('StatisticsService', ["$http", "RecordsService", "SettingsService", function ($http, RecordsService, SettingsService) {

    this.getStatisticsByAjax = function(executionId, successFn) {
      var record = RecordsService.findRecord(executionId);
            var executionFile = 'data/' + record.dirName + '/statistics.json';
            $http.get(executionFile).success(function (response) {
                response.id = executionId;
                successFn(response);
            });
    };

    this.getStatisticsFromVariable = function(executionId, successFn) {
        var record = RecordsService.findRecord(executionId);
        var execution = window['execution_' + record.dirName];
        execution = JSON.parse(JSON.stringify(execution));
        if(successFn) {
            execution.statistics.id = executionId;
            successFn(execution.statistics);
        }
    };

    this.getStatistics = function (executionId, successFn) {
        if(SettingsService.isEmbedded()) {
            this.getStatisticsFromVariable(executionId, successFn);
        } else {
            this.getStatisticsByAjax(executionId, successFn);
        }
    };

}]);