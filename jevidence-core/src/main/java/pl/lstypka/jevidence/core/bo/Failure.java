package pl.lstypka.jevidence.core.bo;

import org.joda.time.DateTime;

public class Failure extends Trace {

    private Throwable throwable;
    private boolean isAssertionFailure;

    public Failure(Level level, String message, Throwable throwable) {
        super(level, DateTime.now(), message);
        this.throwable = throwable;
        this.isAssertionFailure = throwable instanceof AssertionError;
    }

    public Failure(String message, Throwable throwable) {
        this(Level.ERROR, message, throwable);
    }

    public Failure(Level level, Throwable throwable) {
        super(level, DateTime.now(), throwable.getMessage());
        this.throwable = throwable;
        this.isAssertionFailure = throwable instanceof AssertionError;
    }

    public Failure(Throwable throwable) {
        this(Level.ERROR, throwable);
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public boolean isAssertionFailure() {
        return isAssertionFailure;
    }
}
