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

    this.getExecutionId = function (execution, successFn) {
        RecordsService.getRecords(function (records) {
            if(execution === 'first') {
                successFn(records[records.length-1].id);
            } else if(execution === 'last') {
                successFn(records[0].id);
            } else {
                var executionAsInt = parseInt(execution);
                if(executionAsInt < parseInt(records[records.length-1].id)) {
                    successFn(records[records.length-1].id);
                } else if(executionAsInt > parseInt(records[0].id)) {
                    successFn(records[0].id);
                } else {
                    successFn(executionAsInt);
                }
            }
        });
    };

    var createSetOfTests = function (execution) {
        var executionSet = [];
        if (!execution) {
            return executionSet;
        }
        for (var i = 0; i < execution.testClasses.length; i++) {
            for (var j = 0; j < execution.testClasses[i].tests.length; j++) {
                 var element = {
                        fullName: execution.testClasses[i].name + "." + execution.testClasses[i].tests[j].name,
                        simplyName: execution.testClasses[i].name.substring(1 + execution.testClasses[i].name.lastIndexOf('.')) + "." + execution.testClasses[i].tests[j].name,
                        testName: execution.testClasses[i].tests[j].name,
                        className: execution.testClasses[i].name.substring(1 + execution.testClasses[i].name.lastIndexOf('.')),
                        startedAt: execution.testClasses[i].tests[j].startedAt,
                        finishedAt: execution.testClasses[i].tests[j].finishedAt,
                        status: execution.testClasses[i].tests[j].status,
                        params: execution.testClasses[i].tests[j].params,
                        duration: execution.testClasses[i].tests[j].duration
                     };
                 if (!checkIfElementAlreadyExist(executionSet, element)) {
                        executionSet.push(element);
                 }
            }
        }
        return executionSet;
    };

     var checkIfElementAlreadyExist = function (array, element) {
         for (var i = 0; i < array.length; i++) {
             if (array[i].name === element.name) {
                if (JSON.stringify(array[i].params) === JSON.stringify(element.params)) {
                    return true;
                }
             }
         }
         return false;
     };

    this.getExecutionSet = function(executionId, successFn) {
        this.getExecution(executionId, function(execution) {
            successFn(createSetOfTests(execution));
        })
    };

}]);