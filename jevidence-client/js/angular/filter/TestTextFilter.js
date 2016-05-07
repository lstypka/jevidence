reportNgApp.filter('testTextFilter', function () {
        return function (listOfTests, textSearch) {
            if(!listOfTests) {
                return listOfTests;
            }
            var filteredList = [];
            for (var i = 0; i < listOfTests.length; i++) {
                var testClass = listOfTests[i];
                if (textSearch && testClass.name.toLowerCase().contains(textSearch.toLowerCase())) {
                    for (var t = 0; t < testClass.tests.length; t++) {
                        testClass.tests[t].textOk = true;
                    }
                    filteredList.push(testClass);
                } else {
                    var tests = testClass.tests;
                    var atLeastOneTestMatch = false;
                    for (var t = 0; t < tests.length; t++) {
                        if (textSearch && !tests[t].name.toLowerCase().contains(textSearch.toLowerCase())) {
                            tests[t].textOk = false;
                        } else {
                            tests[t].textOk = true;
                            atLeastOneTestMatch= true;
                        }
                    }
                    if (atLeastOneTestMatch) {
                        filteredList.push(testClass);
                    }
                }
            }
            return filteredList;
        }
    }
);