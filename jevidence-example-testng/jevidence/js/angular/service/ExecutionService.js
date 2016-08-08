reportNgApp.service('ExecutionService', ["$http", "RecordsService", 'SettingsService', function ($http, RecordsService, SettingsService) {

    this.getExecutionByAjax = function(executionId, successFn, errorFn) {
          var record = RecordsService.findRecord(executionId);
                var executionFile = 'data/' + record.dirName + '/execution.json';
                $http.get(executionFile).success(function (response) {
                    response.id = executionId;
                    successFn(response);
                });
    };

    this.getExecutionFromVariable = function(executionId, successFn) {
        var record = RecordsService.findRecord(executionId);
        var execution = window['execution_' + record.dirName];
        execution = JSON.parse(JSON.stringify(execution));
        if(successFn) {
            successFn(execution.execution);
        }
    };

    this.getExecution = function (executionId, successFn, errorFn) {
         if(SettingsService.isEmbedded()) {
             this.getExecutionFromVariable(executionId, successFn);
         } else {
             this.getExecutionByAjax(executionId, successFn, errorFn);
         }
    };

}]);