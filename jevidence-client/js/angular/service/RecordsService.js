reportNgApp.service('RecordsService', ["$http", function ($http) {

    var loadedRecords;

    this.findRecord = function (id) {
        if (!loadedRecords) {
            this.getRecords(function () {
                for (var i = 0; i < loadedRecords.length; i++) {
                    if (loadedRecords[i].id === id) {
                        return loadedRecords[i];
                    }
                }
            }, function(response) {
                window.console.log("NO RECORDS");
            });
        } else {
            for (var i = 0; i < loadedRecords.length; i++) {
                if (loadedRecords[i].id === id) {
                    return loadedRecords[i];
                }
            }

        }
    };

    this.getRecords = function (successFn, errorFn) {
        $http.get('data/records').success(function (response) {
            loadedRecords = response.records;
            if (successFn) {
                successFn(loadedRecords);
            }
        }).error(function(data, status, headers, config) {
            if(errorFn) {
                errorFn(data, status, headers, config);
            }
        });
    };

}]);