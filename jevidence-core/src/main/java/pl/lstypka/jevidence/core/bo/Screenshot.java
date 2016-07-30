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

    public Screenshot(File screenshot) {
        this(Level.SCREENSHOT, "", screenshot);
    }

    public File getScreenshot() {
        return screenshot;
    }
}
