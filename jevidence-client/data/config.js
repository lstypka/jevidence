var jEvidenceLayoutConfig = {
                            	menu: [
                                    {   pageId : "dashboard",
                                        name : "Dashboard",
                                        icon : "fa-dashboard"
                                    },
                                    {
                                        pageId : "statistics",
                                        name : "Statistics",
                                        icon : "fa-bar-chart"
                                    },
                                    {
                                        pageId : "performance",
                                        name : "Performance",
                                        icon : "fa-line-chart"
                                    },
                                    {
                                        pageId : "calendar",
                                        name : "Calendar",
                                        icon : "fa-calendar"
                                    }
                            	],
                            	menuExecutions : [
                            	    {
                            	        pageId : "executionDashboard",
                            	        name : "Overview",
                            	        icon : "fa-dashboard"
                            	    },
                            	    {
                            	        pageId : "executionResult",
                            	        name : "Results",
                            	        icon : "fa-server"
                            	    },
                            	    {
                            	        pageId : "executionStatistics",
                            	        name : "Statistics",
                            	        icon : "fa-bar-chart"
                            	    },
                            	    {
                            	        pageId : "executionDefects",
                            	        name : "Defects",
                            	        icon : "fa-bug"
                            	    }
                            	],
                            	pages : [
                            	    {
                            	        id : "index",
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                        extends : "testsTrendChart"
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        id : "dashboard",
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                        id : "testsTrendChart",
                            	                        widgetId : "testsTrendChartWidget",
                            	                        title : "Tests trend chart",
                            	                        width : 12,
                                                        options :
                            	                            {
                            	                                range : "last 3", // all, first 5, last 5
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
                            	                elements : [
                            	                    {
                            	                        widgetId : "testsResultListWidget",
                            	                        title : "Tests result - Execution : ${executionId} ",
                            	                        width : 12,
                            	                        options :
                            	                            {
                            	                                execution : "last", // first, last, or number
                            	                                columns : ["id", "className", "testName", "duration", "status"], // id, className, testName, shortName, fullName, duration, status, startedAt, finishedAt, params
                            	                                headers : ["#", "Test class", "Test name", "Duration", "Status"],
                            	                                widths : [5, 30, 35, 15, 15]
                            	                            }
                            	                    }
                            	                ]
                            	            },
                            	            {
                            	                elements : [
                            	                    {
                            	                        widgetId : "testsResultComparatorWidget",
                            	                        title : "Tests trend",
                            	                        width : 12,
                            	                        options :
                            	                            {
                            	                                firstExecution : "last",
                            	                                secondExecution : "penultimate",
                            	                                columns : ["shortName", "params", "previousStatus", "currentStatus"],
                            	                                headers : ["Test name", "Parameters", "Execution ${secondExecution}", "Execution ${firstExecution}"],
                            	                                widths : [35, 35, 15, 15],
                            	                                tiles : true,
                            	                                table : true,
                            	                                comparator : true
                            	                            }
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        id : "calendar",
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                       widgetId : "emptyWidget",
                            	                       width : 1
                            	                    },
                            	                    {
                            	                        widgetId : "calendarWidget",
                            	                        title : "Calendar of executions",
                            	                        width : 10,
                            	                        collapsible : true
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        id : "statistics",
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                        id : "firstExecutionsPerformanceChartWidget",
                            	                        widgetId : "executionsPerformanceChartWidget",
                            	                        title : "Executions performance - Last 25 executions",
                            	                        width : 12,
                            	                        options :
                            	                            {
                            	                                height : "300px",
                            	                                range : "all", // all, first 5, last 5
                            	                                chartTitle : "Executions time",
                            	                                xAxisTitle : "Execution id",
                            	                                yAxisTitle : "Time [ms]",
                            	                                color : "#B6A2DE",
                            	                                legend: {
                                                                    show : true,
                                                                    orient : 'horizontal',
                                                                    x : 'center',
                                                                    y : 'bottom'
                            	                                },
                            	                                toolbox : {
                                                                     show : true,
                                                                     color : ['#555', '#555'],
                                                                     feature : {
                                                                         restore : {
                                                                            show : true,
                                                                            title : "Refresh"},
                                                                         saveAsImage : {
                                                                             show : true,
                                                                             title : "Save image"}
                                                                     }
                                                                }
                            	                            }
                            	                    }
                            	                ]
                            	            },
                                             {
                                                elements : [
                                                    {
                                                        widgetId : "testsAvgDurationChartWidget",
                                                        title : "Average tests duration (Execution duration / number of tests) - Last ${numberOfExecutions} executions",
                                                        width : 12,
                                                        options : {
                                                            range: "all",
                                                            height: "250px",
                                                            color: ["#008ACD"],
                                                            legend : {
                                                                show : true,
                                                                orient : 'horizontal',
                                                                x : 'center',
                                                                y : 'bottom'
                                                            }
                                                        }
                                                    }
                                                ]
                                             },
                            	             {
                            	                elements : [
                            	                    {
                                                        extends : "testsTrendChart",
                                                        options : {
                                                            height : "250px",
                                                            legend : {
                                                                show : true,
                                                                orient : 'horizontal',
                                                                x : 'center',
                                                                y : 'bottom'
                                                            }
                                                        }
                            	                    }
                            	                ]
                                             }
                            	        ]
                            	    },
                            	    {
                            	        id : "executionStatistics",
                            	        rows : [
                            	            {
                            	                elements : [
                                                    {
                                                         widgetId : "executionResultInPercentageChartWidget",
                                                         title : "Execution ${executionId} result in percentage",
                                                         width: 4,
                                                         options : {
                                                            height: "250px",
                                                            color: {
                                                                passed : "",
                                                                failed : "",
                                                                error : "",
                                                                skipped : ""
                                                            },
                                                            legend : {
                                                                // show: true, // true, false
                                                                //orient : 'vertical', // vertical, horizontal
                                                                //x : 'right', // right, left, center
                                                                //y : 'center' // top, bottom, center
                                                            },
                                                            label : {
                                                                show : true
                                                            },
                                                            toolbox : {
                                                                show : true
                                                            }
                                                         }
                                                    }
                            	                ]
                            	            }
                            	        ]
                            	    }
                            	]

                            };