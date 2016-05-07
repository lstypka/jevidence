package pl.lstypka.jevidence.core.bo;

import org.joda.time.DateTime;

public class Step extends Trace {

    public Step(Level level, String message) {
        super(level, DateTime.now(), message);
    }

    public Step(String message) {
        super(Level.SUCCESS, DateTime.now(), message);
    }

}
