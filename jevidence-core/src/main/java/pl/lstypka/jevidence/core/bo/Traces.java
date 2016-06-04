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

import java.util.List;

public class Traces {

    private List<Trace> traces;
    private Long startedAt;

    public Traces(List<Trace> traces) {
        this.traces = traces;
        this.startedAt = System.currentTimeMillis();
    }

    public List<Trace> getTraces() {
        return traces;
    }

    public Long getStartedAt() {
        return startedAt;
    }
}
