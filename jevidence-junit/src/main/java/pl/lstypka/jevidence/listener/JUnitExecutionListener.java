/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.lstypka.jevidence.listener;

import com.google.common.collect.Lists;
import org.junit.runner.Description;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunListener;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.JEvidence;
import pl.lstypka.jevidence.core.bo.Level;
import pl.lstypka.jevidence.core.bo.Traces;
import pl.lstypka.jevidence.mapper.ExecutionMapper;
import pl.lstypka.jevidence.model.TestResult;
import pl.lstypka.jevidence.model.execution.Status;

import java.util.List;

public class JUnitExecutionListener extends RunListener {

    private List<TestResult> results = Lists.newArrayList();

    @Override
    public void testRunStarted(Description description) throws Exception {
        System.out.println("Number of tests to execute: " + description.testCount());
    }

    @Override
    public void testRunFinished(Result result) throws Exception {
        JEvidence jEvidence = new JEvidence();
        ExecutionMapper executionMapper = new ExecutionMapper(results);
        jEvidence.generate(executionMapper.mapToExecution());
        System.out.println("Number of tests executed: " + result.getRunCount());
    }

    public void testStarted(Description description) throws Exception {
        EvidenceReporter.startTest();
        System.out.println("Starting: " + description.getMethodName());
    }

    public void testFinished(Description description) throws Exception {
        for (Description child : description.getChildren()) {
            if (child.getClassName().equals("ALREADY ADDED")) {
                return;
            }
        }
        Traces traces = EvidenceReporter.finishTest();
        TestResult testResult = prepareTestResult(description, traces, Status.SUCCESS, null);
        results.add(testResult);
        System.out.println("Finished: " + description.getMethodName());
    }

    public void testFailure(Failure failure) throws Exception {
        failure.getDescription().addChild(Description.createTestDescription("ALREADY ADDED", ""));
        Traces traces = EvidenceReporter.finishTest();
        traces.getTraces().add(prepareFailure(failure));
        if (failure.getException() instanceof AssertionError) {
            TestResult testResult = prepareTestResult(failure.getDescription(), traces, Status.FAILED, failure.getException());
            results.add(testResult);
        } else {
            TestResult testResult = prepareTestResult(failure.getDescription(), traces, Status.ERROR, failure.getException());
            results.add(testResult);
        }
        System.out.println("Failed: " + failure.getDescription().getMethodName());
    }

    public void testAssumptionFailure(Failure failure) {
        Traces traces = EvidenceReporter.finishTest();
        traces.getTraces().add(prepareFailure(failure));
        if (failure.getException() instanceof AssertionError) {
            TestResult testResult = prepareTestResult(failure.getDescription(), traces, Status.FAILED, failure.getException());
            results.add(testResult);
        } else {
            TestResult testResult = prepareTestResult(failure.getDescription(), traces, Status.ERROR, failure.getException());
            results.add(testResult);
        }
        System.out.println("Failed: " + failure.getDescription().getMethodName());
    }

    private pl.lstypka.jevidence.core.bo.Failure prepareFailure(Failure junitFailure) {
        return new pl.lstypka.jevidence.core.bo.Failure(Level.ERROR, junitFailure.getMessage(), junitFailure.getException());
    }

    public void testIgnored(Description description) throws Exception {
        Traces traces = EvidenceReporter.finishTest();
        TestResult testResult = prepareTestResult(description, traces, Status.SKIPPED, null);
        results.add(testResult);
        System.out.println("Ignored: " + description.getMethodName());
    }

    private TestResult prepareTestResult(Description description, Traces traces, Status status, Throwable throwable) {
        TestResult testResult = new TestResult();
        testResult.setStartedAt(traces.getStartedAt());
        testResult.setFinishedAt(System.currentTimeMillis());
        testResult.setTraces(traces.getTraces());
        testResult.setClassName(description.getClassName());
        testResult.setTestName(description.getMethodName());
        testResult.setThrowable(throwable);
        testResult.setStatus(status);
        return testResult;
    }
}