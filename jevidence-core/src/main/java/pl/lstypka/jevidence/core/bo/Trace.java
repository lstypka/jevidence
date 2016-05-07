package pl.lstypka.jevidence.core.bo;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

public abstract class Trace {

    private final DateTime timestamp;
    private final Level level;
    private final String message;

    protected Trace(Level level, DateTime timestamp, String message) {
        this.level = level;
        this.timestamp = timestamp;
        this.message = message;
    }

    public DateTime getTimestamp() {
        return timestamp;
    }

    public Level getLevel() {
        return level;
    }

    public String getMessage() {
        return message;
    }
}

