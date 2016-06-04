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

import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Test;
import pl.lstypka.jevidence.model.execution.TestClass;
import pl.lstypka.jevidence.model.statistics.NumberOfSteps;

import com.google.common.collect.Maps;
import pl.lstypka.jevidence.model.statistics.Range;
import pl.lstypka.jevidence.model.statistics.TestExecutionTime;

public class TestsExecutionTimeCollector {

    private final static Integer NUMBER_OF_RANGES = 6;

    public TestExecutionTime gatherStatistics(Execution execution) {
        Map<Long, Integer> values = Maps.newHashMap();
        for (TestClass testClass : execution.getTestClasses()) {
            for (Test test : testClass.getTests()) {
                increment(values, test.getDuration());
            }
        }

        Long minValue = Long.MAX_VALUE;
        Long maxValue = Long.MIN_VALUE;
        for(Map.Entry<Long, Integer> entry : values.entrySet()) {
            Long duration = entry.getKey();
            if(minValue > duration) {
                minValue = duration;
            }
            if(maxValue < duration) {
                maxValue = duration;
            }
        }

        Long delta = (maxValue - minValue) / NUMBER_OF_RANGES;
        List<Range> ranges = Lists.newArrayList();
        for(int i = 0; i < NUMBER_OF_RANGES; i++) {
            Long leftRange = minValue + (i* delta);
            Long rightRange = minValue + ((i+1) * delta);
            if(i == NUMBER_OF_RANGES -1) {
                rightRange = maxValue+1;
            }
            ranges.add(new Range(leftRange, rightRange));
        }

        for(Map.Entry<Long, Integer> entry : values.entrySet()) {
            final Long duration = entry.getKey();
            for (Range range : ranges) {
                if (range.isMyRange(duration)) {
                    range.add(entry.getValue());
                    break;
                }
            }
        }

       return new TestExecutionTime(ranges);
    }

    private void increment(Map<Long, Integer> values, Long duration) {
        Integer numberOfTests = values.get(duration);
        if(numberOfTests == null) {
            numberOfTests = 0;
        }
        numberOfTests += 1;
        values.put(duration, numberOfTests);
    }

}
