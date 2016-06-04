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

public class Failure extends Trace {

    private Throwable throwable;
    private boolean isAssertionFailure;

    public Failure(Level level, String message, Throwable throwable) {
        super(level, DateTime.now(), message);
        this.throwable = throwable;
        this.isAssertionFailure = throwable instanceof AssertionError;
    }

    public Failure(String message, Throwable throwable) {
        this(Level.ERROR, message, throwable);
    }

    public Failure(Level level, Throwable throwable) {
        super(level, DateTime.now(), throwable.getMessage());
        this.throwable = throwable;
        this.isAssertionFailure = throwable instanceof AssertionError;
    }

    public Failure(Throwable throwable) {
        this(Level.ERROR, throwable);
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public boolean isAssertionFailure() {
        return isAssertionFailure;
    }
}
