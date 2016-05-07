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
