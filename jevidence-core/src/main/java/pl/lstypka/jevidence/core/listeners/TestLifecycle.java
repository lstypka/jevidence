package pl.lstypka.jevidence.core.listeners;

import pl.lstypka.jevidence.model.execution.Status;

public class TestLifecycle {

    private long startMillis;
    private long endMillis;
    private Status status;
    private Object[] parameters;
    private Throwable throwable;

    public TestLifecycle(long startMillis, long endMillis, Status status, Object[] parameters, Throwable throwable) {
        this.startMillis = startMillis;
        this.endMillis = endMillis;
        this.status = status;
        this.parameters = parameters;
        this.throwable = throwable;
    }

    public long getStartMillis() {
        return startMillis;
    }

    public long getEndMillis() {
        return endMillis;
    }

    public Status getStatus() {
        return status;
    }

    public Object[] getParameters() {
        return parameters;
    }

    public Throwable getThrowable() {
        return throwable;
    }
}
