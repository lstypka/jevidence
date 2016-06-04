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
import pl.lstypka.jevidence.model.statistics.Statistics;

public class StatisticsCollector {

    private TestsResultsInPercentageCollector testsResultsInPercentageCollector;
    private NumberOfStepsCollector numberOfStepsCollector;
    private TestsExecutionTimeCollector testsExecutionTimeCollector;

    public StatisticsCollector() {
        this.testsResultsInPercentageCollector = new TestsResultsInPercentageCollector();
        this.numberOfStepsCollector = new NumberOfStepsCollector();
        this.testsExecutionTimeCollector = new TestsExecutionTimeCollector();
    }

    public Statistics gatherStatistics(Execution execution) {
        Statistics statistics = new Statistics();
        statistics.setTestsResultsInPercentage(testsResultsInPercentageCollector.gatherStatistics(execution));
        statistics.setNumberOfSteps(numberOfStepsCollector.gatherStatistics(execution));
        statistics.setTestExecutionTime(testsExecutionTimeCollector.gatherStatistics(execution));
        return statistics;
    }
}
