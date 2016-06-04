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
