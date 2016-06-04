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
package pl.lstypka.jevidence.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class TestsResultsInPercentage implements Serializable {

    @JsonProperty("success")
    private final Integer success;

    @JsonProperty("error")
    private final Integer error;

    @JsonProperty("failed")
    private final Integer failed;

    @JsonProperty("skipped")
    private final Integer skipped;

    public TestsResultsInPercentage(Integer success, Integer error, Integer failed, Integer skipped) {
        this.success = success;
        this.error = error;
        this.failed = failed;
        this.skipped = skipped;
    }

    public Integer getSuccess() {
        return success;
    }

    public Integer getError() {
        return error;
    }

    public Integer getFailed() {
        return failed;
    }

    public Integer getSkipped() {
        return skipped;
    }
}
