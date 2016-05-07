package pl.lstypka.jevidence.model;

import pl.lstypka.jevidence.core.bo.Trace;
import pl.lstypka.jevidence.model.execution.Status;

import java.io.Serializable;
import java.util.List;

public class TestResult implements Serializable {

    private String className;
    private String testName;
    private Long startedAt;
    private Long finishedAt;
    private Status status;
    private Throwable throwable;
    private List<Trace> traces;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public Long getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Long startedAt) {
        this.startedAt = startedAt;
    }

    public Long getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(Long finishedAt) {
        this.finishedAt = finishedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public void setThrowable(Throwable throwable) {
        this.throwable = throwable;
    }

    public List<Trace> getTraces() {
        return traces;
    }

    public void setTraces(List<Trace> traces) {
        this.traces = traces;
    }
}
