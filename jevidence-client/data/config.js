var jEvidenceLayoutConfig = {
                                mode : "normal",
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
                            	        name : "Dashboard",
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
                            	                        extends : "testsTrendChart",
                            	                        width: 8,
                            	                        options : {
                            	                            height : "200px",
                            	                            toolbox : {
                            	                                show : false
                            	                            },
                            	                            legend : {
                            	                                y : "bottom"
                            	                            }
                            	                        }
                            	                    },
                            	                    {
                            	                        extends : "executionResultInPercentageChartWidget",
                            	                        width: 4,
                            	                        options : {
                            	                            execution : "last",
                            	                            height : "150px"
                            	                        }
                            	                    }
                            	                ]
                            	            },
                            	            {
                            	                elements : [
                            	                    {
                            	                        extends : "testsResultListWidget",
                            	                        width: 4,
                            	                        options : {
                            	                            execution : "last",
                            	                            columns : ["testName", "status"],
                            	                            headers : ["Test", "Status"],
                            	                            widths : [80, 20]
                            	                        }
                            	                    },
                            	                    {
                            	                        extends : 'executionDefectsTableWidget',
                            	                        width : 8,
                            	                        options : {
                            	                            execution : "last"
                            	                        }
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
                            	                        extends : "executionOverviewWidget",
                            	                        options : {
                            	                            execution : "last"
                            	                        }
                            	                    }
                            	                ]
                            	            },
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
                            	                        widgetId : "executionAvgNumberOfStepsChartWidget",
                            	                        width: 5,
                            	                        title : "Avg number of steps : Execution ${executionId}",
                            	                        options : {
                            	                            execution : "last"
                            	                        }
                            	                    },
                            	                    {
                            	                        widgetId : "emptyWidget",
                            	                        width: 2
                            	                    },
                            	                    {
                            	                        widgetId : "executionResultInPercentageChartWidget",
                            	                        width: 5,
                            	                        title : "Result in percentage : Execution ${executionId}",
                            	                        options : {
                            	                            execution : "last"
                            	                        }
                             	                    }
                            	                ]
                            	            },
                            	            {
                            	                elements : [
                            	                    {
                            	                        widgetId : "testsResultListWidget",
                            	                        id : "testsResultListWidget",
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
                            	            },
                            	            {
                            	                elements : [
                            	                    {
                            	                        extends: "executionEnvironmentVariablesTableWidget",
                            	                        options : {
                            	                            execution : "last"
                            	                        }
                            	                    },
                            	                    {
                            	                        extends : "executionParamsTableWidget",
                            	                        width : 8,
                            	                        options : {
                            	                            execution : "last"
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
                            	        id : "executionDashboard",
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                        id : "executionOverviewWidget",
                            	                        widgetId : "executionOverviewWidget",
                            	                        title : "Overview of execution ${executionId}",
                            	                        width : 12
                            	                    }
                            	                ]
                            	            },
                            	            {
                            	                elements : [
                            	                    {
                            	                        id : 'executionStatisticsTableWidget',
                            	                        widgetId : 'executionStatisticsTableWidget',
                            	                        width: 4,
                            	                        title : "Statistics [${executionId}]",
                            	                        options : {
                            	                          //  whiteList : ['Number of tests', 'Number of steps'],
                            	                           // blackList : ['Number of tests']
                            	                        }
                            	                    },
                            	                    {
                            	                        id : 'executionEnvironmentVariablesTableWidget',
                            	                        widgetId : 'executionEnvironmentVariablesTableWidget',
                            	                        width: 4,
                            	                        title : 'Environment properties [${executionId}]'
                            	                    },
                            	                    {
                            	                        id : 'executionParamsTableWidget',
                            	                        widgetId : 'executionParamsTableWidget',
                            	                        width : 4,
                            	                        title : 'Test params : [${executionId}]',
                            	                        options : {
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
                                                         id : "executionResultInPercentageChartWidget",
                                                         widgetId : "executionResultInPercentageChartWidget",
                                                         title : "Execution ${executionId} result in percentage",
                                                         width: 6,
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
                                                    },
                                                    {
                                                        widgetId : "executionAvgNumberOfStepsChartWidget",
                                                        title : "Execution ${executionId} - Average number of steps",
                                                        width: 6,
                                                        options : {
                                                            color : ["#00CF0C", "#0C74CF", "#CFAD0E", "#930FCF", "#CF2A00", "#FFA500", "#FF9567"],
                                                            height: "250px",
                                                            legend : {
                                                                //show : true,
                                                                //orient : 'horizontal',
                                                                //y : 'top',
                                                                //x : 'center',
                                                            },
                                                            label : {
                                                                show : true
                                                            },
                                                            toolbox : {
                                                                show : true
                                                            }
                                                        }
                                                    },
                            	                ]
                            	            },
                            	            {
                            	                elements : [
                                                    {
                                                        widgetId : "executionAvgTimeChartWidget",
                                                        title : "Execution ${executionId} - Average execution time ",
                                                        width: 12,
                                                        options : {
                                                            color : ["#FFA500"],
                                                            height: "250px"
                                                        }
                                                    }
                            	                ]
                            	            }
                            	        ]
                            	    },
                            	    {
                            	        id : 'executionDefects',
                            	        rows : [
                            	            {
                            	                elements : [
                            	                    {
                            	                        id : 'executionDefectsTableWidget',
                            	                        widgetId : 'executionDefectsTableWidget',
                            	                        width : 12,
                            	                        title : 'Defects of execution ${executionId}'
                            	                    }
                            	                ]
                            	            }
                            	        ]
                            	    }
                            	]

                            };