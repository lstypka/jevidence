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
                            	        "id" : "dashboard",
                            	        "rows" : [
                            	            {
                            	                "elements" : [
                            	                    {
                            	                        "widgetId" : "testsTrendChartWidget",
                            	                        "title" : "Tests trend chart",
                            	                        "width" : 12
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
                            	    }
                            	]

                            };