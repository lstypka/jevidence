reportNgApp.service('RendererService', ['$filter', 'ExecutionService', function ($filter, ExecutionService) {

        this.renderColumnValue = function(column, test, executionId) {
            if(column === 'testName' || column === 'fullName' || column === 'shortName') {
                var params = encodeURIComponent(JSON.stringify(test['params']));
                return '<a href="#/execution/'+executionId+'/result?testname='+test['fullName']+'&params='+params+'" title='+test[column]+'>'+test[column]+'</a>';
            }
            if(column === 'duration') {
                var duration = $filter('timeDurationFilter')(test['duration']);
                return '<span title="'+duration+'">'+duration+'</span>';
            }
            if(column === 'status' || column === 'currentStatus' || column === 'previousStatus') {
                if(test[column] === 'SUCCESS') {
                    return '<span class="label label-block label-test-success">SUCCESS</span>';
                }
                if(test[column] === 'FAILED') {
                    return '<span class="label label-block label-test-failed">FAILED</span>';
                }
                if(test[column] === 'ERROR') {
                    return '<span class="label label-block label-test-error">ERROR</span>';
                }
                if(test[column] === 'SKIPPED') {
                    return '<span class="label label-block label-test-skipped">SKIPPED</span>';
                }
                if(test[column] === 'UNKNOWN') {
                    return '<span class="label label-block label-default">Didn\'t exist</span>';
                }

            }
            if(column === 'params') {
                var params = test.params;
                if(params) {
                    var html = '';
                    Object.keys(params).forEach(function(key,index) {
                        html += '<span class="label-test-param" style="background-color: white; margin-left: 5px;" title="'+key+' : '+params[key]+'">'+key+' : '+params[key]+'</span>';
                    });
                    return html;
                }
            }
            return test[column];
        };


    this.renderColumnHeader = function(column, options) {
       if(options && options.columns && options.headers) {
            if(options.columns.indexOf(column) !== -1) {

                var value = options.headers[options.columns.indexOf(column)];
                if(options.execution && value.indexOf('${execution}') !== -1) {
                    ExecutionService.getExecutionByConfigId(options.execution, function(execution){
                        value = value.replace("${executionId}", execution.id);
                    });
                }
                if(options.firstExecution && value.indexOf('${firstExecution}') !== -1) {
                   ExecutionService.getExecutionByConfigId(options.firstExecution, function(execution){
                       value = value.replace("${firstExecution}", execution.id);
                   });
                }
                if(options.secondExecution && value.indexOf('${secondExecution}') !== -1) {
                   ExecutionService.getExecutionByConfigId(options.secondExecution, function(execution){
                       value = value.replace("${secondExecution}", execution.id);
                   });
                }
                return value;
            }
       }

       if(column === 'id') {
          return "#";
       }

       return column;
    };

}]);