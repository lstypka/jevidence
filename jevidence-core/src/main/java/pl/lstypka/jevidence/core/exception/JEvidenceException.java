package pl.lstypka.jevidence.core.exception;

public class JEvidenceException extends RuntimeException {

    public JEvidenceException(String message, Throwable throwable) {
        super(message, throwable);
    }

    public JEvidenceException(String message) {
        super(message);
    }
}
