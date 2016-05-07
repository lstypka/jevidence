package pl.lstypka.jevidence.logger;

import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Failure;
import pl.lstypka.jevidence.core.bo.Level;
import pl.lstypka.jevidence.core.bo.Step;

import java.util.logging.Handler;
import java.util.logging.LogRecord;

public class JEvidenceUtilLoggerHandler extends Handler {

    @Override
    public void publish(LogRecord record) {
        if (record.getThrown() != null) {
            EvidenceReporter.failure(new Failure(Level.ERROR, record.getMessage(), record.getThrown()));
        } else {
            if (record.getLevel().equals(java.util.logging.Level.WARNING)) {
                EvidenceReporter.step(new Step(Level.WARN, record.getMessage()));
            } else {
                EvidenceReporter.step(new Step(Level.INFO, record.getMessage()));
            }
        }
    }

    @Override
    public void flush() {

    }

    @Override
    public void close() throws SecurityException {

    }
}
