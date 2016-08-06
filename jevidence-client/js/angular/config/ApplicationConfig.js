var reportNgApp = angular.module('reportNgApp', [ 'ui.select2', 'ui.calendar', 'ui.bootstrap', 'ngSanitize', 'bootstrapLightbox', 'ngAnimate', 'ngRoute']);

reportNgApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'view/dashboard.html'
            })
            .when('/statistics', {
                templateUrl: 'view/statistics.html'
            })
            .when('/performance', {
                templateUrl: 'view/performance.html'
            })
            .when('/calendar', {
                templateUrl: 'view/calendar.html'
            })
            .when('/execution/:executionId/overview', {
                templateUrl: 'view/execution_overview.html'
            })
            .when('/execution/:executionId/result', {
                templateUrl: 'view/execution_result.html'
            })
            .when('/execution/:executionId/statistics', {
                templateUrl: 'view/execution_statistics.html'
            })
            .when('/execution/:executionId/defects', {
                templateUrl: 'view/execution_defects.html'
            })
            .when('/dynamiccontent', {
                templateUrl: 'view/dynamic-content.html'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    }]);