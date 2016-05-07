package pl.lstypka.jevidence.logger;

import org.apache.log4j.AppenderSkeleton;
import org.apache.log4j.spi.LoggingEvent;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Failure;
import pl.lstypka.jevidence.core.bo.Level;
import pl.lstypka.jevidence.core.bo.Step;

public class JEvidenceLog4jHandler extends AppenderSkeleton {

    @Override
    protected void append(LoggingEvent loggingEvent) {
        String message = loggingEvent.getMessage() != null ? loggingEvent.getMessage().toString() : "";
        if (loggingEvent.getThrowableInformation() != null && loggingEvent.getThrowableInformation().getThrowable() != null) {
            EvidenceReporter.failure(new Failure(Level.ERROR, message, loggingEvent.getThrowableInformation().getThrowable()));
        } else {
            org.apache.log4j.Level level = loggingEvent.getLevel();
            if (org.apache.log4j.Level.ERROR.equals(level) || org.apache.log4j.Level.FATAL.equals(level)) {
                EvidenceReporter.step(new Step(Level.ERROR, message));
            } else if (org.apache.log4j.Level.WARN.equals(level)) {
                EvidenceReporter.step(new Step(Level.WARN, message));
            } else {
                EvidenceReporter.step(new Step(Level.INFO, message));
            }
        }
    }

    public void close() {

    }

    public boolean requiresLayout() {
        return false;
    }
}
