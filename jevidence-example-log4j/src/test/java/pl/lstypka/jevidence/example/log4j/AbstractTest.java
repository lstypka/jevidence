/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.lstypka.jevidence.example.log4j;


import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.TestResult;
import pl.lstypka.jevidence.core.listeners.TestLifecycle;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.logger.JEvidenceLog4jHandler;
import pl.lstypka.jevidence.runner.JEvidenceJUnitRunner;

@RunWith(JEvidenceJUnitRunner.class)
public abstract class AbstractTest {
    private static final org.apache.log4j.Logger LOGGER = org.apache.log4j.Logger.getLogger(AbstractTest.class.getName());


    private static TestLifecycleListener testLifecycleListener = new TestLifecycleListener() {
        public void onSuiteStart() {
        }

        public void onSuiteFinish() {
        }

        public void onTestStart(TestLifecycle testResult) {
            LOGGER.debug("LOG4J: Test started");
        }

        public void onTestSuccess(TestLifecycle testLifecycle) {
            LOGGER.debug("LOG4J: Test success");
        }

        public void onTestFailure(TestLifecycle testLifecycle) {
            LOGGER.debug("LOG4J: Test failure");
        }

        public void onTestSkipped(TestLifecycle testLifecycle) {
            LOGGER.debug("LOG4J: Test skipped");
        }
    };

    @BeforeClass
    public static void before() {
        LOGGER.getParent().addAppender(new JEvidenceLog4jHandler());
        EvidenceReporter.registerListener(testLifecycleListener);
    }
}
