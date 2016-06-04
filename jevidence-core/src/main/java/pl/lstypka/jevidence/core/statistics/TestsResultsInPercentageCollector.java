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
package pl.lstypka.jevidence.core.statistics;

import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Status;
import pl.lstypka.jevidence.model.execution.Test;
import pl.lstypka.jevidence.model.execution.TestClass;
import pl.lstypka.jevidence.model.statistics.TestsResultsInPercentage;

public class TestsResultsInPercentageCollector {

    public TestsResultsInPercentage gatherStatistics(Execution execution) {
        int success = 0;
        int failed = 0;
        int error = 0;
        int skipped = 0;
        for (TestClass testClass : execution.getTestClasses()) {
            for (Test test : testClass.getTests()) {
                switch (test.getStatus()) {
                    case SUCCESS:
                        success++;
                        break;
                    case ERROR:
                        error++;
                        break;
                    case FAILED:
                        failed++;
                        break;
                    case SKIPPED:
                        skipped++;
                        break;
                }
            }
        }
        int sum = success + failed + error + skipped;
        int skippedPercentage = (int)(((double)skipped / sum)*100);
        int failedPercentage = (int)(((double)failed / sum)*100);
        int errorPercentage = (int)(((double)error / sum)*100);
        int successPercentage = 100 - skippedPercentage - failedPercentage - errorPercentage;

        return new TestsResultsInPercentage(successPercentage, errorPercentage, failedPercentage, skippedPercentage);
    }
}
