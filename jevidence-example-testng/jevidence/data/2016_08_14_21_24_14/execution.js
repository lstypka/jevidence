var execution_2016_08_14_21_24_14 = { "execution" : {"startedAt":"2016-08-14 21:24:14:662","finishedAt":"2016-08-14 21:24:15:709","duration":1047,"testClasses":[{"name":"pl.lstypka.jevidence.example.log4j.SubtractMathServiceTest","tests":[{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:15:586","message":"Listener : Test started"},{"level":"success","timestamp":"2016-08-14 21:24:15:587","message":"Substracting 5 - 1 "},{"level":"success","timestamp":"2016-08-14 21:24:15:611","message":"Substracting 11 - 4 "},{"level":"success","timestamp":"2016-08-14 21:24:15:674","message":"Listener : Test success"}],"status":"SUCCESS","name":"shouldSubtractThreeNumbers","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:15:586","finishedAt":"2016-08-14 21:24:15:674","duration":88},{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:15:586","message":"Listener : Test skipped"},{"assertionError":false,"level":"error","timestamp":"2016-08-14 21:24:15:728","message":"\nParameter 'firstNumber' is required by @Test on method paramTest but has not been marked @Optional or defined\nin C:\\Users\\Łukasz\\.IdeaIC2016\\system\\temp-testng-customsuite.xml","stacktrace":"org.testng.TestNGException: \nParameter 'firstNumber' is required by @Test on method paramTest but has not been marked @Optional or defined\nin C:\\Users\\Łukasz\\.IdeaIC2016\\system\\temp-testng-customsuite.xml\r\n\tat org.testng.internal.Parameters.createParameters(Parameters.java:154)\r\n\tat org.testng.internal.Parameters.createParameters(Parameters.java:361)\r\n\tat org.testng.internal.Parameters.handleParameters(Parameters.java:451)\r\n\tat org.testng.internal.Invoker.handleParameters(Invoker.java:1274)\r\n\tat org.testng.internal.Invoker.createParameters(Invoker.java:989)\r\n\tat org.testng.internal.Invoker.invokeTestMethods(Invoker.java:1079)\r\n\tat org.testng.internal.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:129)\r\n\tat org.testng.internal.TestMethodWorker.run(TestMethodWorker.java:112)\r\n\tat org.testng.TestRunner.privateRun(TestRunner.java:782)\r\n\tat org.testng.TestRunner.run(TestRunner.java:632)\r\n\tat org.testng.SuiteRunner.runTest(SuiteRunner.java:366)\r\n\tat org.testng.SuiteRunner.runSequentially(SuiteRunner.java:361)\r\n\tat org.testng.SuiteRunner.privateRun(SuiteRunner.java:319)\r\n\tat org.testng.SuiteRunner.run(SuiteRunner.java:268)\r\n\tat org.testng.SuiteRunnerWorker.runSuite(SuiteRunnerWorker.java:52)\r\n\tat org.testng.SuiteRunnerWorker.run(SuiteRunnerWorker.java:86)\r\n\tat org.testng.TestNG.runSuitesSequentially(TestNG.java:1244)\r\n\tat org.testng.TestNG.runSuitesLocally(TestNG.java:1169)\r\n\tat org.testng.TestNG.run(TestNG.java:1064)\r\n\tat org.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:74)\r\n\tat org.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:121)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)\r\n","isAssertionError":false}],"status":"SKIPPED","name":"paramTest","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:15:585","finishedAt":"2016-08-14 21:24:15:585","duration":0},{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:15:674","message":"Listener : Test started"},{"level":"success","timestamp":"2016-08-14 21:24:15:675","message":"Substracting 5 - 3 "},{"level":"success","timestamp":"2016-08-14 21:24:15:709","message":"Listener : Test failure"},{"assertionError":false,"level":"error","timestamp":"2016-08-14 21:24:15:731","stacktrace":"java.lang.NullPointerException\r\n\tat pl.lstypka.jevidence.example.log4j.SubtractMathServiceTest.shouldSubtractTwoNumbers(SubtractMathServiceTest.java:37)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat org.testng.internal.MethodInvocationHelper.invokeMethod(MethodInvocationHelper.java:86)\r\n\tat org.testng.internal.Invoker.invokeMethod(Invoker.java:643)\r\n\tat org.testng.internal.Invoker.invokeTestMethod(Invoker.java:820)\r\n\tat org.testng.internal.Invoker.invokeTestMethods(Invoker.java:1128)\r\n\tat org.testng.internal.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:129)\r\n\tat org.testng.internal.TestMethodWorker.run(TestMethodWorker.java:112)\r\n\tat org.testng.TestRunner.privateRun(TestRunner.java:782)\r\n\tat org.testng.TestRunner.run(TestRunner.java:632)\r\n\tat org.testng.SuiteRunner.runTest(SuiteRunner.java:366)\r\n\tat org.testng.SuiteRunner.runSequentially(SuiteRunner.java:361)\r\n\tat org.testng.SuiteRunner.privateRun(SuiteRunner.java:319)\r\n\tat org.testng.SuiteRunner.run(SuiteRunner.java:268)\r\n\tat org.testng.SuiteRunnerWorker.runSuite(SuiteRunnerWorker.java:52)\r\n\tat org.testng.SuiteRunnerWorker.run(SuiteRunnerWorker.java:86)\r\n\tat org.testng.TestNG.runSuitesSequentially(TestNG.java:1244)\r\n\tat org.testng.TestNG.runSuitesLocally(TestNG.java:1169)\r\n\tat org.testng.TestNG.run(TestNG.java:1064)\r\n\tat org.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:74)\r\n\tat org.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:121)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)\r\n","isAssertionError":false}],"status":"ERROR","name":"shouldSubtractTwoNumbers","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:15:674","finishedAt":"2016-08-14 21:24:15:709","duration":35}],"skipped":1,"failed":0,"errors":1,"passed":1,"startedAt":"2016-08-14 21:24:15:585","finishedAt":"2016-08-14 21:24:15:709","duration":124},{"name":"pl.lstypka.jevidence.example.log4j.AddMathServiceTest","tests":[{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:15:404","message":"Listener : Test started"},{"level":"success","timestamp":"2016-08-14 21:24:15:405","message":"Adding 5 + 3 "},{"level":"success","timestamp":"2016-08-14 21:24:15:584","message":"Listener : Test success"}],"status":"SUCCESS","name":"shouldAddTwoNumbers","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:15:404","finishedAt":"2016-08-14 21:24:15:584","duration":180},{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:14:736","message":"Listener : Test skipped"},{"assertionError":false,"level":"error","timestamp":"2016-08-14 21:24:15:730","message":"\nParameter 'firstNumber' is required by @Test on method paramTest but has not been marked @Optional or defined\nin C:\\Users\\Łukasz\\.IdeaIC2016\\system\\temp-testng-customsuite.xml","stacktrace":"org.testng.TestNGException: \nParameter 'firstNumber' is required by @Test on method paramTest but has not been marked @Optional or defined\nin C:\\Users\\Łukasz\\.IdeaIC2016\\system\\temp-testng-customsuite.xml\r\n\tat org.testng.internal.Parameters.createParameters(Parameters.java:154)\r\n\tat org.testng.internal.Parameters.createParameters(Parameters.java:361)\r\n\tat org.testng.internal.Parameters.handleParameters(Parameters.java:451)\r\n\tat org.testng.internal.Invoker.handleParameters(Invoker.java:1274)\r\n\tat org.testng.internal.Invoker.createParameters(Invoker.java:989)\r\n\tat org.testng.internal.Invoker.invokeTestMethods(Invoker.java:1079)\r\n\tat org.testng.internal.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:129)\r\n\tat org.testng.internal.TestMethodWorker.run(TestMethodWorker.java:112)\r\n\tat org.testng.TestRunner.privateRun(TestRunner.java:782)\r\n\tat org.testng.TestRunner.run(TestRunner.java:632)\r\n\tat org.testng.SuiteRunner.runTest(SuiteRunner.java:366)\r\n\tat org.testng.SuiteRunner.runSequentially(SuiteRunner.java:361)\r\n\tat org.testng.SuiteRunner.privateRun(SuiteRunner.java:319)\r\n\tat org.testng.SuiteRunner.run(SuiteRunner.java:268)\r\n\tat org.testng.SuiteRunnerWorker.runSuite(SuiteRunnerWorker.java:52)\r\n\tat org.testng.SuiteRunnerWorker.run(SuiteRunnerWorker.java:86)\r\n\tat org.testng.TestNG.runSuitesSequentially(TestNG.java:1244)\r\n\tat org.testng.TestNG.runSuitesLocally(TestNG.java:1169)\r\n\tat org.testng.TestNG.run(TestNG.java:1064)\r\n\tat org.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:74)\r\n\tat org.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:121)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)\r\n","isAssertionError":false}],"status":"SKIPPED","name":"paramTest","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:14:662","finishedAt":"2016-08-14 21:24:14:662","duration":0},{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:14:865","message":"Listener : Test started"},{"level":"success","timestamp":"2016-08-14 21:24:14:871","message":"Adding 5 + 3 "},{"level":"success","timestamp":"2016-08-14 21:24:14:959","message":"Adding 11 + 8 "},{"level":"success","timestamp":"2016-08-14 21:24:15:040","message":"Listener : Test failure"},{"assertionError":false,"level":"error","timestamp":"2016-08-14 21:24:15:730","stacktrace":"java.lang.NullPointerException\r\n\tat pl.lstypka.jevidence.example.log4j.AddMathServiceTest.shouldAddFourNumbers(AddMathServiceTest.java:60)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat org.testng.internal.MethodInvocationHelper.invokeMethod(MethodInvocationHelper.java:86)\r\n\tat org.testng.internal.Invoker.invokeMethod(Invoker.java:643)\r\n\tat org.testng.internal.Invoker.invokeTestMethod(Invoker.java:820)\r\n\tat org.testng.internal.Invoker.invokeTestMethods(Invoker.java:1128)\r\n\tat org.testng.internal.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:129)\r\n\tat org.testng.internal.TestMethodWorker.run(TestMethodWorker.java:112)\r\n\tat org.testng.TestRunner.privateRun(TestRunner.java:782)\r\n\tat org.testng.TestRunner.run(TestRunner.java:632)\r\n\tat org.testng.SuiteRunner.runTest(SuiteRunner.java:366)\r\n\tat org.testng.SuiteRunner.runSequentially(SuiteRunner.java:361)\r\n\tat org.testng.SuiteRunner.privateRun(SuiteRunner.java:319)\r\n\tat org.testng.SuiteRunner.run(SuiteRunner.java:268)\r\n\tat org.testng.SuiteRunnerWorker.runSuite(SuiteRunnerWorker.java:52)\r\n\tat org.testng.SuiteRunnerWorker.run(SuiteRunnerWorker.java:86)\r\n\tat org.testng.TestNG.runSuitesSequentially(TestNG.java:1244)\r\n\tat org.testng.TestNG.runSuitesLocally(TestNG.java:1169)\r\n\tat org.testng.TestNG.run(TestNG.java:1064)\r\n\tat org.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:74)\r\n\tat org.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:121)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)\r\n","isAssertionError":false}],"status":"ERROR","name":"shouldAddFourNumbers","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:14:865","finishedAt":"2016-08-14 21:24:15:038","duration":173},{"steps":[{"level":"success","timestamp":"2016-08-14 21:24:15:047","message":"Listener : Test started"},{"level":"success","timestamp":"2016-08-14 21:24:15:047","message":"Adding 5 + 3 "},{"level":"success","timestamp":"2016-08-14 21:24:15:218","message":"Adding 11 + 8 "},{"level":"success","timestamp":"2016-08-14 21:24:15:403","message":"Listener : Test failure"},{"assertionError":true,"level":"error","timestamp":"2016-08-14 21:24:15:731","message":"expected:<13> but was:<19>","stacktrace":"java.lang.AssertionError: expected:<13> but was:<19>\r\n\tat org.fest.assertions.Fail.failure(Fail.java:228)\r\n\tat org.fest.assertions.Fail.comparisonFailed(Fail.java:85)\r\n\tat org.fest.assertions.Fail.failIfNotEqual(Fail.java:71)\r\n\tat org.fest.assertions.GenericAssert.isEqualTo(GenericAssert.java:217)\r\n\tat org.fest.assertions.IntAssert.isEqualTo(IntAssert.java:61)\r\n\tat pl.lstypka.jevidence.example.log4j.AddMathServiceTest.shouldAddThreeNumbers(AddMathServiceTest.java:47)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat org.testng.internal.MethodInvocationHelper.invokeMethod(MethodInvocationHelper.java:86)\r\n\tat org.testng.internal.Invoker.invokeMethod(Invoker.java:643)\r\n\tat org.testng.internal.Invoker.invokeTestMethod(Invoker.java:820)\r\n\tat org.testng.internal.Invoker.invokeTestMethods(Invoker.java:1128)\r\n\tat org.testng.internal.TestMethodWorker.invokeTestMethods(TestMethodWorker.java:129)\r\n\tat org.testng.internal.TestMethodWorker.run(TestMethodWorker.java:112)\r\n\tat org.testng.TestRunner.privateRun(TestRunner.java:782)\r\n\tat org.testng.TestRunner.run(TestRunner.java:632)\r\n\tat org.testng.SuiteRunner.runTest(SuiteRunner.java:366)\r\n\tat org.testng.SuiteRunner.runSequentially(SuiteRunner.java:361)\r\n\tat org.testng.SuiteRunner.privateRun(SuiteRunner.java:319)\r\n\tat org.testng.SuiteRunner.run(SuiteRunner.java:268)\r\n\tat org.testng.SuiteRunnerWorker.runSuite(SuiteRunnerWorker.java:52)\r\n\tat org.testng.SuiteRunnerWorker.run(SuiteRunnerWorker.java:86)\r\n\tat org.testng.TestNG.runSuitesSequentially(TestNG.java:1244)\r\n\tat org.testng.TestNG.runSuitesLocally(TestNG.java:1169)\r\n\tat org.testng.TestNG.run(TestNG.java:1064)\r\n\tat org.testng.IDEARemoteTestNG.run(IDEARemoteTestNG.java:74)\r\n\tat org.testng.RemoteTestNGStarter.main(RemoteTestNGStarter.java:121)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\r\n\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\r\n\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\r\n\tat java.lang.reflect.Method.invoke(Method.java:497)\r\n\tat com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)\r\n","isAssertionError":true}],"status":"FAILED","name":"shouldAddThreeNumbers","params":{"Execution":"jevidence"},"startedAt":"2016-08-14 21:24:15:047","finishedAt":"2016-08-14 21:24:15:402","duration":355}],"skipped":1,"failed":1,"errors":1,"passed":1,"startedAt":"2016-08-14 21:24:14:662","finishedAt":"2016-08-14 21:24:15:584","duration":922}],"skipped":2,"failed":1,"errors":2,"passed":2,"environmentVariables":[{"key":"Operation system","value":"Windows 10"},{"key":"User","value":"Łukasz"},{"key":"Java version","value":"1.8.0_65"},{"key":"Total available memory (bytes) [after tests]","value":"128974848"},{"key":"Available processors [before tests]","value":"4"},{"key":"Free memory (bytes) [after tests]","value":"105710984"},{"key":"Free memory (bytes) [before tests]","value":"111850424"},{"key":"Available processors [after tests]","value":"4"},{"key":"Total available memory (bytes) [before tests]","value":"128974848"}]}, "statistics" : {"testsResultsInPercentage":{"success":30,"error":28,"failed":14,"skipped":28},"numberOfSteps":{"ranges":[{"leftRange":1,"rightRange":3,"value":2},{"leftRange":3,"rightRange":4,"value":1},{"leftRange":4,"rightRange":5,"value":2},{"leftRange":5,"rightRange":6,"value":2}]},"testExecutionTime":{"ranges":[{"leftRange":0,"rightRange":59,"value":3},{"leftRange":59,"rightRange":118,"value":1},{"leftRange":118,"rightRange":177,"value":1},{"leftRange":177,"rightRange":236,"value":1},{"leftRange":236,"rightRange":295,"value":0},{"leftRange":295,"rightRange":356,"value":1}]}}, "defects" : {"defects":[{"tests":[{"className":"pl.lstypka.jevidence.example.log4j.SubtractMathServiceTest","testName":"shouldSubtractTwoNumbers","params":{"Execution":"jevidence"}},{"className":"pl.lstypka.jevidence.example.log4j.AddMathServiceTest","testName":"shouldAddFourNumbers","params":{"Execution":"jevidence"}}],"exceptionClassName":"java.lang.NullPointerException","exceptionMessage":null},{"tests":[{"className":"pl.lstypka.jevidence.example.log4j.AddMathServiceTest","testName":"shouldAddThreeNumbers","params":{"Execution":"jevidence"}}],"exceptionClassName":"java.lang.AssertionError","exceptionMessage":"expected:<13> but was:<19>"}]} }