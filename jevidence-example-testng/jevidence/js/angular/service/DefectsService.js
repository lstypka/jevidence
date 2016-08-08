reportNgApp.service('DefectsService', ["$http", "RecordsService", 'SettingsService', function ($http, RecordsService, SettingsService) {

    this.getDefectsByAjax = function(executionId, successFn) {
         var record = RecordsService.findRecord(executionId);
                var executionFile = 'data/' + record.dirName + '/defects.json';
                $http.get(executionFile).success(function (response) {
                    response.id = executionId;
                    successFn(response);
          });
    };

    this.getDefectsFromVariable = function(executionId, successFn) {
        var record = RecordsService.findRecord(executionId);
        var execution = window['execution_' + record.dirName];
        execution = JSON.parse(JSON.stringify(execution));
        if(successFn) {
            successFn(execution.defects);
        }
    };

    this.getDefects = function (executionId, successFn) {
        if(SettingsService.isEmbedded()) {
            this.getDefectsFromVariable(executionId, successFn);
        } else {
            this.getDefectsByAjax(executionId, successFn);
        }
    };

}]);