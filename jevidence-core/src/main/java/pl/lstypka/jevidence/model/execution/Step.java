/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.lstypka.jevidence.model.execution;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import pl.lstypka.jevidence.core.io.JEvidenceDateTimeSerializer;

import java.io.File;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Step implements Serializable {

    @JsonProperty("level")
    private String level;

    @JsonProperty("timestamp")
    @JsonSerialize(using = JEvidenceDateTimeSerializer.class)
    private DateTime timestamp;

    @JsonProperty("message")
    private String message;

    @JsonProperty("screenshot")
    private String screenshot;

    @JsonProperty("stacktrace")
    private String stacktrace;

    @JsonProperty("isAssertionError")
    private Boolean isAssertionError;

    @JsonIgnore
    private Throwable throwable;

    private File screenshotFile;

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public DateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(DateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getScreenshot() {
        return screenshot;
    }

    public void setScreenshot(String screenshot) {
        this.screenshot = screenshot;
    }

    public String getStacktrace() {
        return stacktrace;
    }

    public void setStacktrace(String stacktrace) {
        this.stacktrace = stacktrace;
    }

    public Boolean isAssertionError() {
        return isAssertionError;
    }

    public void setAssertionError(Boolean assertionError) {
        isAssertionError = assertionError;
    }

    public File getScreenshotFile() {
        return screenshotFile;
    }

    public void setScreenshotFile(File screenshotFile) {
        this.screenshotFile = screenshotFile;
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public void setThrowable(Throwable throwable) {
        this.throwable = throwable;
    }
}
