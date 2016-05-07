package pl.lstypka.jevidence.core.bo;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import java.io.File;

public class Screenshot extends Trace {

    private File screenshot;

    public Screenshot(Level level, String message, File screenshot) {
        super(level, DateTime.now(), message);
        this.screenshot = screenshot;
    }

    public Screenshot(String message, File screenshot) {
        this(Level.SCREENSHOT, message, screenshot);
    }

    public File getScreenshot() {
        return screenshot;
    }
}
