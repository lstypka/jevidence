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

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.testng.ITestResult;
import org.testng.annotations.Parameters;

import pl.lstypka.jevidence.core.bo.Failure;
import pl.lstypka.jevidence.core.bo.Trace;
import pl.lstypka.jevidence.core.bo.Traces;
import pl.lstypka.jevidence.model.execution.Step;
import pl.lstypka.jevidence.model.execution.Test;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

public class TestMapper implements Mapper<ITestResult, Test> {

    private StepMapper stepMapper;

    public TestMapper() {
        this.stepMapper = new StepMapper();
    }

    public Test map(ITestResult result) {
        Test test = new Test(result.getName());
        test.setStartedAt(getTime(result.getStartMillis()));
        test.setFinishedAt(getTime(result.getEndMillis()));
        test.setDuration(new Duration(test.getStartedAt().toDateTime(), test.getFinishedAt().toDateTime()).getMillis());
        test.setStatus(StatusMapper.getStatus(result));
        test.setParams(getParameters(result));
        List<Trace> traces = ((Traces) result.getAttribute("testSteps")).getTraces();
        if (traces == null) {
            traces = Lists.newArrayList();
        }
        addExceptionTraceIfNecessary(traces, result);
        List<Step> steps = stepMapper.map(traces);
        test.setSteps(steps);
        return test;
    }

    private Map<String, String> getParameters(ITestResult result) {
        // String suiteName = result.getTestContext().getSuite().getName();
        //  parameters.put("Suite", suiteName);
        Map<String, String> parameters = Maps.newHashMap();
        parameters.put("Execution", result.getTestContext().getName());

        Object[] values = result.getParameters();
        Class[] valuesClasses = new Class[values.length];
        for (int i = 0; i < values.length; i++) {
            if (values[i] == null) {
                valuesClasses[i] = Object.class;
            } else {
                valuesClasses[i] = values[i].getClass();
            }
        }
        String testName = result.getName();

        Method method = null;
        for (Method m : result.getTestClass().getRealClass().getMethods()) {
            if (m.getName().equals(testName)) {
                method = m;
                break;
            }
        }
        Annotation[] declaredAnnotations = method.getDeclaredAnnotations();
        for (Annotation annotation : declaredAnnotations) {
            if (annotation instanceof Parameters) {
                String[] keys = ((Parameters) annotation).value();
                for (int i = 0; i < keys.length; i++) {
                    if(values.length > i) {
                        parameters.put(getDefaultIfNull(keys[i]), getDefaultIfNull(values[i]));
                    }
                }
            }
        }

        return parameters;
    }

    private String getDefaultIfNull(Object o) {
        return o == null ? "null" : o.toString();
    }

    private void addExceptionTraceIfNecessary(List<Trace> traces, ITestResult result) {
        if (result.getThrowable() != null) {
            Throwable throwable = result.getThrowable();
            Failure failure = new Failure(throwable.getMessage(), throwable);

            if (checkIfExceptionShouldBeAdded(traces, result)) {
                traces.add(failure);
            }
        }
    }

    private boolean checkIfExceptionShouldBeAdded(List<Trace> traces, ITestResult result) {
        if (!traces.isEmpty()) {
            Trace lastTrace = traces.get(traces.size() - 1);
            if (lastTrace instanceof Failure) {
                return !(((Failure) lastTrace).getThrowable() == result.getThrowable());
            }
        }
        return true;
    }

    public List<Test> map(List<ITestResult> tests) {
        List<Test> results = Lists.newArrayList();
        for (ITestResult test : tests) {
            results.add(map(test));
        }
        return results;
    }

    private DateTime getTime(long millis) {
        return new DateTime(millis);
    }

}
