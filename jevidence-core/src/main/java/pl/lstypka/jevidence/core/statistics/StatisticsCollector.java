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
