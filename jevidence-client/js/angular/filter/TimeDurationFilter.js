reportNgApp.filter('timeDurationFilter', function () {
        return function (millis) {
            var formattedValue = moment.utc(millis).format("HH[h] mm[m] ss[s] SSS[ms]");
            var splitValue = formattedValue.split(" ");
            var count = 0;
            if (splitValue[0] === '00h') {
                count++;
                if (splitValue[1] === '00m') {
                    count++;
                    if (splitValue[1] === '00s') {
                        count++;
                    }
                }
            }

            var result = "";
            for (var i = 0; i < splitValue.length; i++) {
                if (count <= i) {
                    if(splitValue[i].startsWith("0")) {
                        result += splitValue[i].substring(1) + " ";
                    } else {
                        result += splitValue[i] + " ";
                    }
                }
            }
            return result;
        }
    }
);