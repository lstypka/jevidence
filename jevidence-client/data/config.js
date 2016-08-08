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
                            	                        "widgetId" : "emptyWidget",
                            	                        "width" : 2
                            	                    },
                            	                    {
                            	                        "widgetId" : "testsResultListWidget",
                            	                        "title" : "Tests result - Execution : ${executionId} ",
                            	                        "width" : 8,
                            	                        "options" :
                            	                            {
                            	                                "execution" : "last", // first, last, or number
                            	                                "columns" : ["id", "shortName", "fullName", "duration", "status"], // id, testName, shortName, fullName, duration, status, startedAt, finishedAt, params
                            	                                "widths" : [5, 20, 45, 15, 15]
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