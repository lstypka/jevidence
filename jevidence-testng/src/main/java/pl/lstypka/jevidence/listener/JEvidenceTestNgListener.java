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

import org.testng.*;
import org.testng.xml.XmlSuite;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.JEvidence;
import pl.lstypka.jevidence.core.listeners.TestLifecycle;
import pl.lstypka.jevidence.mapper.ExecutionMapper;
import pl.lstypka.jevidence.core.io.FileUtils;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.mapper.StatusMapper;
import pl.lstypka.jevidence.model.execution.Entry;
import pl.lstypka.jevidence.model.execution.Execution;

import java.util.List;

public class JEvidenceTestNgListener implements ITestListener, IReporter {

    public void generateReport(List<XmlSuite> xmlSuites, List<ISuite> suites, String outputDirectory) {
            ExecutionMapper executionMapper = new ExecutionMapper(suites);
            Execution execution = executionMapper.mapToExecution();
            JEvidence jEvidence = new JEvidence();
            jEvidence.generate(execution);
    }

    public void onTestStart(ITestResult iTestResult) {
        EvidenceReporter.startTest();
        for (TestLifecycleListener listener : EvidenceReporter.getListeners()) {
            listener.onTestStart(prepare(iTestResult));
        }
    }

    public void onTestSuccess(ITestResult iTestResult) {
        for (TestLifecycleListener listener : EvidenceReporter.getListeners()) {
            listener.onTestSuccess(prepare(iTestResult));
        }
        iTestResult.setAttribute("testSteps", EvidenceReporter.finishTest());
    }

    public void onTestFailure(ITestResult iTestResult) {
        for (TestLifecycleListener listener : EvidenceReporter.getListeners()) {
            listener.onTestFailure(prepare(iTestResult));
        }
        iTestResult.setAttribute("testSteps", EvidenceReporter.finishTest());
    }

    public void onTestSkipped(ITestResult iTestResult) {
        EvidenceReporter.startTest();
        for (TestLifecycleListener listener : EvidenceReporter.getListeners()) {
            listener.onTestSkipped(prepare(iTestResult));
        }
        iTestResult.setAttribute("testSteps", EvidenceReporter.finishTest());
    }

    public void onTestFailedButWithinSuccessPercentage(ITestResult iTestResult) {
        iTestResult.setAttribute("testSteps", EvidenceReporter.finishTest());
    }

    public void onStart(ITestContext iTestContext) {
        EvidenceReporter.addEnvironmentVariable(new Entry("Available processors [before tests]", "" + Runtime.getRuntime().availableProcessors()));
        EvidenceReporter.addEnvironmentVariable(new Entry("Free memory (bytes) [before tests]", "" + Runtime.getRuntime().freeMemory()));
        EvidenceReporter.addEnvironmentVariable(new Entry("Total available memory (bytes) [before tests]", "" + Runtime.getRuntime().totalMemory()));
    }

    public void onFinish(ITestContext iTestContext) {
        EvidenceReporter.addEnvironmentVariable(new Entry("Available processors [after tests]", "" + Runtime.getRuntime().availableProcessors()));
        EvidenceReporter.addEnvironmentVariable(new Entry("Free memory (bytes) [after tests]", "" + Runtime.getRuntime().freeMemory()));
        EvidenceReporter.addEnvironmentVariable(new Entry("Total available memory (bytes) [after tests]", "" + Runtime.getRuntime().totalMemory()));
    }

    private TestLifecycle prepare(ITestResult result) {
        return new TestLifecycle(result.getStartMillis(), result.getEndMillis(), StatusMapper.getStatus(result), result.getParameters(), result.getThrowable());
    }

}
