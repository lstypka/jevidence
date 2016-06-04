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

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Test;
import pl.lstypka.jevidence.model.execution.TestClass;
import pl.lstypka.jevidence.model.statistics.NumberOfSteps;
import pl.lstypka.jevidence.model.statistics.Range;

import java.util.List;
import java.util.Map;

public class NumberOfStepsCollector {

    private final static Integer NUMBER_OF_RANGES = 6;

    public NumberOfSteps gatherStatistics(Execution execution) {
        Map<Integer, Integer> testsSteps = Maps.newHashMap();
        for (TestClass testClass : execution.getTestClasses()) {
            for (Test test : testClass.getTests()) {
                increment(testsSteps, test.getSteps().size());
            }
        }

        Integer minValue = Integer.MAX_VALUE;
        Integer maxValue = Integer.MIN_VALUE;
        for(Map.Entry<Integer, Integer> entry : testsSteps.entrySet()) {
            Integer duration = entry.getKey();
            if(minValue > duration) {
                minValue = duration;
            }
            if(maxValue < duration) {
                maxValue = duration;
            }
        }

        Integer delta = (maxValue - minValue) / NUMBER_OF_RANGES;
        List<Range> ranges = Lists.newArrayList();
        for(int i = 0; i < NUMBER_OF_RANGES; i++) {
            Integer leftRange = minValue + (i* delta);
            Integer rightRange = minValue + ((i+1) * delta);
            if(i == NUMBER_OF_RANGES -1) {
                rightRange = maxValue+1;
            }
            ranges.add(new Range(leftRange.longValue(), rightRange.longValue()));
        }

        for(Map.Entry<Integer, Integer> entry : testsSteps.entrySet()) {
            final Integer numberOfSteps = entry.getKey();
            for (Range range : ranges) {
                if (range.isMyRange(numberOfSteps.longValue())) {
                    range.add(entry.getValue());
                    break;
                }
            }
        }

        return new NumberOfSteps(ranges);
    }

    private void increment(Map<Integer, Integer> testsSteps, Integer numberOfSteps) {
        Integer numberOfTests = testsSteps.get(numberOfSteps);
        if (numberOfTests == null) {
            numberOfTests = 0;
        }
        numberOfTests += 1;
        testsSteps.put(numberOfSteps, numberOfTests);
    }
}
