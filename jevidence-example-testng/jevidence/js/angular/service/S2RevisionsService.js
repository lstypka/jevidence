reportNgApp.service('S2RevisionsService', ["RecordsService", function (RecordsService) {

   var _initalValue = {};

   var formatDirNameToTime = function(dirName) {
       var spitValue = dirName.split('_');
       return spitValue[0] + '-' + spitValue[1] + '-' + spitValue[2] + ' ' + spitValue[3] + ':' + spitValue[4] + ':' + spitValue[5];
   };

   var getStartedTimeForExecution = function(executionId) {
        var foundRecord = RecordsService.findRecord(executionId);
        return formatDirNameToTime(foundRecord.dirName);
   };

   var getStatusCss = function(executionId) {
        if(!executionId) {
            return;
        }
        var foundRecord = RecordsService.findRecord(executionId);
        if(foundRecord.error > 0) {
            return 'errors-gradient';
        }
        if(foundRecord.failed > 0) {
            return 'failed-gradient';
        }
        return 'success-gradient';
   };

   var getStatus = function(executionId) {
        if(!executionId) {
            return;
        }
        var foundRecord = RecordsService.findRecord(executionId);
        if(foundRecord.error > 0) {
            return 'Error';
        }
        if(foundRecord.failed > 0) {
            return 'Failed';
        }
        return 'Success';
   };

   return {
           minimumInputLength: 0,
           minimumResultsForSearch: 1000000,
           containerCssClass : "revision-combobox",
           dropdownCssClass: "select2-revisions-dropdown",
           query: function (query) {
                  RecordsService.getRecords(function (records) {
                    var revisions = [];
                    for (var i = 0; i < records.length; i++) {
                         revisions.push({id : records[i].id, text : records[i].id});
                    }
                    query.callback({results: revisions});
                  });
           },
           formatResult: function (item) {
                  return item ? '<div><b>Execution: #' + item.id + '</b><span class="label ' + getStatusCss(item.id) + '" style="float: right; width: 60px;">' + getStatus(item.id) + '</span><br/>Started at: '+getStartedTimeForExecution(item.id)+'</div><hr style="margin-top: 2px; margin-bottom: 10px; border-color: #ccc;"/>': '';
           },
           formatSelection: function (item) {
                //  return '<b>#'+item.text+'</b>';
                    return item ? '<span class="label ' + getStatusCss(item.id) + '" style="height: 26px; width: 100%; margin: 0px; padding: 0px;"><b>#' + item.id + '</b></span>': '';
           },
           setInitSelection: function (val) {
                  _initalValue = val;
                  return val;
           },
                  initSelection: function (element, callback) {
                  callback(_initalValue);
           }
   }
 }
]);