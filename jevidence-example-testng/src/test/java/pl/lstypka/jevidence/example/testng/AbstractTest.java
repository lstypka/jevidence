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
package pl.lstypka.jevidence.example.testng;


import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Listeners;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Step;
import pl.lstypka.jevidence.core.listeners.TestLifecycle;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.listener.JEvidenceTestNgListener;

@Listeners(JEvidenceTestNgListener.class)
public class AbstractTest {

    @BeforeSuite
    public void before() {

        EvidenceReporter.registerListener(new TestLifecycleListener() {
            public void onSuiteStart() {}

            public void onSuiteFinish() {}

            public void onTestStart(TestLifecycle testResult) {
                EvidenceReporter.step(new Step(String.format("Listener : Test started")));
            }

            public void onTestSuccess(TestLifecycle testResult) {
                EvidenceReporter.step(new Step(String.format("Listener : Test success")));
            }

            public void onTestFailure(TestLifecycle testResult) {
                EvidenceReporter.step(new Step(String.format("Listener : Test failure")));
            }

            public void onTestSkipped(TestLifecycle testResult) {
                EvidenceReporter.step(new Step(String.format("Listener : Test skipped")));
            }
        });
    }
}
