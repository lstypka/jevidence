package pl.lstypka.jevidence.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.testng.*;

import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.model.execution.Entry;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Test;
import pl.lstypka.jevidence.model.execution.TestClass;

public class ExecutionMapper {

    private List<ISuite> suites;
    private TestMapper testMapper;

    public ExecutionMapper(List<ISuite> suites) {
        this.suites = suites;
        this.testMapper = new TestMapper();
    }

    public Execution mapToExecution() {
        Execution execution = new Execution();
        for (ISuite suite : suites) {
            Map<String, ISuiteResult> results = suite.getResults();
            for (ISuiteResult r : results.values()) {
                ITestContext context = r.getTestContext();
                proceedResult(context.getPassedTests(), execution);
                proceedResult(context.getSkippedTests(), execution);
                proceedResult(context.getFailedTests(), execution);
            }
        }
        fillExecutionProperties(execution);
        fillEnvironmentVariables(execution);
        return execution;
    }

    private void proceedResult(IResultMap results, Execution execution) {
        for (ITestResult result : results.getAllResults()) {
            String testClassKey = result.getTestClass().getName();
            TestClass testClass = getTestClass(execution, testClassKey);
            testClass.addTest(testMapper.map(result));
        }
    }

    private TestClass getTestClass(Execution execution, String testClassKey) {
        TestClass testClass = execution.getTestClass(testClassKey);
        if (testClass == null) {
            testClass = execution.addTestClass(testClassKey);
        }
        return testClass;
    }

    private void fillExecutionProperties(Execution execution) {
        DateTime startedAt = null;
        DateTime finishedAt = null;
        int passed = 0;
        int failed = 0;
        int error = 0;
        int skipped = 0;

        for (TestClass testClass : execution.getTestClasses()) {
            fillTestClassDate(testClass);

            // date properties
            if (startedAt == null || startedAt.isAfter(testClass.getStartedAt())) {
                startedAt = testClass.getStartedAt();
            }
            if (finishedAt == null || finishedAt.isBefore(testClass.getFinishedAt())) {
                finishedAt = testClass.getFinishedAt();
            }

            // test numbers
            passed += testClass.getPassed();
            failed += testClass.getFailed();
            error += testClass.getErrors();
            skipped += testClass.getSkipped();
        }
        execution.setStartedAt(startedAt);
        execution.setFinishedAt(finishedAt);
        execution.setDuration(new Duration(startedAt.toDateTime(), finishedAt.toDateTime()).getMillis());
        execution.setPassed(passed);
        execution.setFailed(failed);
        execution.setErrors(error);
        execution.setSkipped(skipped);
    }

    private void fillTestClassDate(TestClass testClass) {
        DateTime startedAt = null;
        DateTime finishedAt = null;
        int passed = 0;
        int failed = 0;
        int error = 0;
        int skipped = 0;

        for (Test test : testClass.getTests()) {
            // check date
            if (startedAt == null || startedAt.isAfter(test.getStartedAt())) {
                startedAt = test.getStartedAt();
            }
            if (finishedAt == null || finishedAt.isBefore(test.getFinishedAt())) {
                finishedAt = test.getFinishedAt();
            }

            // check test numbers
            switch (test.getStatus()) {
                case SUCCESS:
                    passed++;
                    break;
                case FAILED:
                    failed++;
                    break;
                case ERROR:
                    error++;
                    break;
                case SKIPPED:
                    skipped++;
                    break;
            }
        }
        testClass.setStartedAt(startedAt);
        testClass.setFinishedAt(finishedAt);
        testClass.setDuration(new Duration(startedAt.toDateTime(), finishedAt.toDateTime()).getMillis());
        testClass.setPassed(passed);
        testClass.setFailed(failed);
        testClass.setErrors(error);
        testClass.setSkipped(skipped);
    }

    private void fillEnvironmentVariables(Execution execution) {
        List<Entry> environmentVariables = Lists.newArrayList(EvidenceReporter.getEnvironmentVariables());
        environmentVariables.add(0, new Entry("Java version", System.getProperty("java.version")));
        environmentVariables.add(0, new Entry("User", System.getProperty("user.name")));
        environmentVariables.add(0, new Entry("Operation system", System.getProperty("os.name")));

        execution.setEnvironmentVariables(environmentVariables);
    }

}
