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
package pl.lstypka.jevidence.core.listeners;

import pl.lstypka.jevidence.model.execution.Status;

public class TestLifecycle {

    private long startMillis;
    private long endMillis;
    private Status status;
    private Object[] parameters;
    private Throwable throwable;

    public TestLifecycle(long startMillis, long endMillis, Status status, Object[] parameters, Throwable throwable) {
        this.startMillis = startMillis;
        this.endMillis = endMillis;
        this.status = status;
        this.parameters = parameters;
        this.throwable = throwable;
    }

    public long getStartMillis() {
        return startMillis;
    }

    public long getEndMillis() {
        return endMillis;
    }

    public Status getStatus() {
        return status;
    }

    public Object[] getParameters() {
        return parameters;
    }

    public Throwable getThrowable() {
        return throwable;
    }
}
