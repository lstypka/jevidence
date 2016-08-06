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
                            	"pages" : [
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