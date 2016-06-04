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
