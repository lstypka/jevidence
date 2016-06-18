reportNgApp.controller('CalendarCtrl', ["$scope", "$timeout", "SettingsService", "RecordsService",
    function ($scope, $timeout, SettingsService, RecordsService) {

    $scope.events = [];
    $scope.eventSources = [$scope.events];
    var init = function() {
        RecordsService.getRecords(function (records) {
                for (var i = 0; i < records.length; i++) {
                    $scope.events.push({
                        tooltip: 'Started at ' + createFullDate(records[i].dirName) + '\nStatus: ' + calculateStatus(records[i]) + '\nPass Percentage: ' + records[i].percentage + "%\nPassed: " + records[i].success + "\nFailed: " + records[i].failed + "\nErrors: " + records[i].error + "\nSkipped: " + records[i].skipped,
                        title: 'Pass Percentage: ' + records[i].percentage + "%",
                        start: createDate(records[i].dirName),
                        color: calculateColor(records[i]),
                        executionId: records[i].id
                    });
                }
        });
    };

    var calculateStatus = function(execution) {
        if(execution.error > 0) {
            return 'Error'
        }
        if(execution.failed > 0) {
            return 'Failed'
        }
        return 'Success';
    };

    var calculateColor = function(execution) {
        if(execution.error > 0) {
           return '#d70000';
        }
        if(execution.failed > 0) {
            return '#f39c12';
        }
        return '#00a65a';
    };

    var createDate = function(dirName) {
        var splitDirName = dirName.split('_');
        return splitDirName[0] + "-" + splitDirName[1] + "-" + splitDirName[2];
    };

    var createFullDate = function(dirName) {
        var splitDirName = dirName.split('_');
        return splitDirName[0] + "-" + splitDirName[1] + "-" + splitDirName[2] + ' ' +splitDirName[3] + ":" + splitDirName[4] + ":" + splitDirName[5];
    };

    init();

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        embedded: SettingsService.isEmbedded(),
        header:{
          left: '',
          center: 'prev title  next',
          right: ''
        },
        eventRender: function(event, element) {
             element.attr("href", '#/execution/'+event.executionId+'/overview');
             element.attr("title", event.tooltip);
             element.attr("data-toggle", 'tooltip');
             element.attr("data-placement", 'bottom');
             $timeout(function() {
                               $('[data-toggle="tooltip"]').tooltip();
                         }, 500);
             element.mouseenter(function(event) {
                element.css('cursor', 'pointer');
             });
        }
      }
    };

}]);