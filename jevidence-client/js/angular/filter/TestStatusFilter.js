reportNgApp.filter('testStatusFilter', function () {
        return function (listOfTests, status, allowedStatuses) {
            if(!status) {
                return listOfTests;
            }
            if (!listOfTests) {
                return listOfTests;
            }
            var filteredList = [];
            for (var i = 0; i < listOfTests.length; i++) {
                var testClass = listOfTests[i];
                var tests = testClass.tests;
                var atLeastOneTestMatch = false;
                for (var t = 0; t < tests.length; t++) {
                    if (tests[t].status.toLowerCase() === status.value.label.toLowerCase()) {
                        tests[t].statusOk = true;
                        atLeastOneTestMatch = true;
                    } else if(status.value.label.toLowerCase() === 'all'){
                         for(var a = 0; a < allowedStatuses.length; a++) {
                            if(allowedStatuses[a].label.toLowerCase() === tests[t].status.toLowerCase()) {
                                tests[t].statusOk = true;
                                atLeastOneTestMatch = true;
                            }
                         }
                    } else {
                        tests[t].statusOk = false;
                    }
                }
                if (atLeastOneTestMatch) {
                    filteredList.push(testClass);
                }
            }
            return filteredList;
        }
    }
);