reportNgApp.service('S2StatusService', [function () {

   var _initalValue = {};

   return {
           minimumInputLength: 0,
           minimumResultsForSearch: 1000000,
           containerCssClass: "select2-statuses",
           dropdownCssClass: "select2-statuses-dropdown",
           query: function (query) {
                    var statuses = [];
                    statuses.push({id : 0, text : 'Error', label : 'Error', style : 'test-error'});
                    statuses.push({id : 1, text : 'Failed', label : 'Failed', style : 'test-failed'});
                    statuses.push({id : 2, text : 'Success', label : 'Success', style : 'test-success'});
                    statuses.push({id : 3, text : 'Skipped', label : 'Skipped', style : 'test-skipped'});
                    statuses.push({id : 4, text : 'All', label : 'All', style : 'test-default'});
                    query.callback({results: statuses});
           },
           formatResult: function (item) {
               return "<span class='s2statuses-choises label label-" + item.style+ "'>" + item.label + "</span>";
           },
           formatSelection: function (item) {
               return "<span class='label label-" + item.style+ "'>" + item.label + "</span>";
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