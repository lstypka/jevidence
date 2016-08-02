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

import pl.lstypka.jevidence.model.execution.Status;

import java.util.List;

public class TestResult {

    private Long startedAt;
    private Long finishedAt;
    private List<Trace> traces;
    private Status status;

    public TestResult(Long startedAt, Long finishedAt, List<Trace> traces) {
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.traces = traces;
        recognizeStatus();
    }

    private void recognizeStatus() {
        for(Trace trace : traces) {
            if(trace instanceof Failure) {
                status = ((Failure)trace).isAssertionFailure() ? Status.FAILED : Status.ERROR;
                return;
            }
        }
        status = Status.SUCCESS;
    }

    public Long getStartedAt() {
        return startedAt;
    }

    public Long getFinishedAt() {
        return finishedAt;
    }

    public List<Trace> getTraces() {
        return traces;
    }

    public Status getStatus() {
        return status;
    }
}
