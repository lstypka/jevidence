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
