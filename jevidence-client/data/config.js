var jEvidenceLayoutConfig = {
                            	"menu": [
                                    {   "pageId" : "dashboard",
                                        "name" : "Dashboard",
                                        "icon" : "fa-dashboard"
                                    },
                                    {
                                        "pageId" : "statistics",
                                        "name" : "Statistics",
                                        "icon" : "fa-bar-chart"
                                    },
                                    {
                                        "pageId" : "performance",
                                        "name" : "Performance",
                                        "icon" : "fa-line-chart"
                                    },
                                    {
                                        "pageId" : "calendar",
                                        "name" : "Calendar",
                                        "icon" : "fa-calendar"
                                    }
                            	],
                            	"menuExecutions" : [
                            	    {
                            	        "pageId" : "executionDashboard",
                            	        "name" : "Overview",
                            	        "icon" : "fa-dashboard"
                            	    },
                            	    {
                            	        "pageId" : "executionResult",
                            	        "name" : "Results",
                            	        "icon" : "fa-server"
                            	    },
                            	    {
                            	        "pageId" : "executionStatistics",
                            	        "name" : "Statistics",
                            	        "icon" : "fa-bar-chart"
                            	    },
                            	    {
                            	        "pageId" : "executionDefects",
                            	        "name" : "Defects",
                            	        "icon" : "fa-bug"
                            	    }
                            	],
                            	"pages" : [
                            	    {
                            	        "id" : "index",
                            	        "rows" : [
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "extends" : "testsTrendChart"
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        "id" : "dashboard",
                            	        "rows" : [
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "id" : "testsTrendChart",
                            	                        "widgetId" : "testsTrendChartWidget",
                            	                        "title" : "Tests trend chart",
                            	                        "width" : 12,
                                                        "options" :
                            	                            {
                            	                                "range" : "last 3", // all, first 5, last 5
                            	                                /*"chartTitle" : ["Skipped", "Error", "Failed", "Success"],
                            	                                "xAxisTitle" : "Execution id",
                            	                                "yAxisTitle" : "Number of tests",
                            	                                "color" : ["#B6A2DE", "#634ABC", "#312431", "#742DEE"],
                            	                                "toolbox" : {
                                                                     "show" : true,
                                                                     "color": ['#555', '#555'],
                                                                     "feature" : {
                                                                         "restore" : {
                                                                            "show" : true,
                                                                            "title" : "Refresh"},
                                                                         "saveAsImage" : {
                                                                             "show" : true,
                                                                             "title" : "Save image"}
                                                                     }
                                                                }*/
                            	                            }
                            	                    },
                            	                ]
                            	            },
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "widgetId" : "testsResultListWidget",
                            	                        "title" : "Tests result - Execution : ${executionId} ",
                            	                        "width" : 12,
                            	                        "options" :
                            	                            {
                            	                                "execution" : "last", // first, last, or number
                            	                                "columns" : ["id", "className", "testName", "duration", "status"], // id, className, testName, shortName, fullName, duration, status, startedAt, finishedAt, params
                            	                                "widths" : [5, 30, 35, 15, 15]
                            	                            }
                            	                    }
                            	                ]
                            	            },
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "widgetId" : "testsResultComparatorWidget",
                            	                        "title" : "Tests trend",
                            	                        "width" : 12,
                            	                        "options" :
                            	                            {
                            	                                "firstExecution" : "last",
                            	                                "secondExecution" : "penultimate",
                            	                                "columns" : ["shortName", "params", "previousStatus", "currentStatus"],
                            	                                "headers" : ["Test name", "Parameters", "Execution ${secondExecution}", "Execution ${firstExecution}"],
                            	                                "widths" : [35, 35, 15, 15],
                            	                                "tiles" : true,
                            	                                "table" : true,
                            	                                "comparator" : true
                            	                            }
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        "id" : "calendar",
                            	        "rows" : [
                            	            {
                            	                "elements" : [
                            	                    {
                            	                       "widgetId" : "emptyWidget",
                            	                       "width" : 1
                            	                    },
                            	                    {
                            	                        "widgetId" : "calendarWidget",
                            	                        "title" : "Calendar of executions",
                            	                        "width" : 10,
                            	                        "collapsible" : true
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        "id" : "statistics",
                            	        "rows" : [
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "id" : "firstExecutionsPerformanceChartWidget",
                            	                        "widgetId" : "executionsPerformanceChartWidget",
                            	                        "title" : "Executions performance - Last 25 executions",
                            	                        "width" : 6,
                            	                        "options" :
                            	                            {
                            	                                "height" : "300px",
                            	                                "range" : "last 2", // all, first 5, last 5
                            	                                "chartTitle" : "Executions time",
                            	                                "xAxisTitle" : "Execution id",
                            	                                "yAxisTitle" : "Time [ms]",
                            	                                "color" : "#B6A2DE",
                            	                                "toolbox" : {
                                                                     "show" : true,
                                                                     "color": ['#555', '#555'],
                                                                     "feature" : {
                                                                         "restore" : {
                                                                            "show" : true,
                                                                            "title" : "Refresh"},
                                                                         "saveAsImage" : {
                                                                             "show" : true,
                                                                             "title" : "Save image"}
                                                                     }
                                                                }
                            	                            }
                            	                    },
                            	                    {
                            	                        "extends" : "firstExecutionsPerformanceChartWidget",
                            	                        "options" : {
                            	                            "range" : "first 3",
                            	                            "color" : "#A64234"
                            	                        }
                            	                    }
                            	                ]
                            	            },
                            	             {
                            	                "elements" : [
                            	                    {
                                                        "extends" : "testsTrendChart",
                                                        "options" : {
                                                            "height" : "250px"
                                                        }
                            	                    }
                            	                ]
                                             }
                            	        ]
                            	    }
                            	]

                            };