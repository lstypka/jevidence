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

import com.google.common.collect.Lists;
import pl.lstypka.jevidence.core.bo.Failure;
import pl.lstypka.jevidence.core.bo.Screenshot;
import pl.lstypka.jevidence.core.bo.Trace;
import pl.lstypka.jevidence.model.execution.Step;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

public class StepMapper{

    public Step map(Trace trace) {
        Step step = new Step();
        step.setLevel(trace.getLevel().name().toLowerCase());
        step.setTimestamp(trace.getTimestamp());
        if (trace instanceof pl.lstypka.jevidence.core.bo.Step) {
            step.setMessage(trace.getMessage());
        }
        if (trace instanceof Screenshot) {
            step.setScreenshotFile(((Screenshot) trace).getScreenshot());
            step.setMessage(trace.getMessage());
        }
        if (trace instanceof Failure) {
            Failure failure = (Failure) trace;
            step.setStacktrace(getStacktrace(failure.getThrowable()));
            step.setMessage(failure.getThrowable().getMessage());
            step.setThrowable(failure.getThrowable());
            step.setAssertionError(failure.isAssertionFailure());
        }
        return step;
    }

    private String getStacktrace(Throwable throwable) {
        StringWriter sw = new StringWriter();
        throwable.printStackTrace(new PrintWriter(sw));
        return sw.toString();
    }

    public List<Step> map(List<Trace> traces) {
        List<Step> results = Lists.newArrayList();
        for(Trace trace : traces) {
            results.add(map(trace));
        }
        return results;
    }

}
