package pl.lstypka.jevidence.mapper;

import org.joda.time.DateTime;
import org.joda.time.Duration;
import pl.lstypka.jevidence.model.TestResult;
import pl.lstypka.jevidence.model.execution.Test;

public class TestMapper {

    private StepMapper stepMapper;

    public TestMapper() {
        this.stepMapper = new StepMapper();
    }

    public Test map(TestResult result) {
        Test test = new Test(result.getTestName());
        test.setStartedAt(getTime(result.getStartedAt()));
        test.setFinishedAt(getTime(result.getFinishedAt()));
        test.setDuration(new Duration(test.getStartedAt().toDateTime(), test.getFinishedAt().toDateTime()).getMillis());
        test.setStatus(result.getStatus());
        test.setSteps(stepMapper.map(result.getTraces()));
        return test;
    }

    private DateTime getTime(long millis) {
        return new DateTime(millis);
    }
}
