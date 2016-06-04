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
