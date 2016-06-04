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
import com.fasterxml.jackson.annotation.JsonProperty;

public class Record {

    private String id;
    private String dirName;
    private Integer percentage;
    private Integer success;
    private Integer failed;
    private Integer error;
    private Integer skipped;
    private Long duration;

    @JsonCreator
    public Record(@JsonProperty("id") String id, @JsonProperty("dirName") String dirName,
                  @JsonProperty("percentage") Integer percentage, @JsonProperty("duration") Long duration,
                  @JsonProperty("success") Integer success, @JsonProperty("failed") Integer failed,
                  @JsonProperty("error") Integer error,
                  @JsonProperty("skipped") Integer skipped) {
        this.id = id;
        this.dirName = dirName;
        this.percentage = percentage;
        this.duration = duration;
        this.success = success;
        this.failed = failed;
        this.error = error;
        this.skipped = skipped;
    }

    public String getId() {
        return id;
    }

    public String getDirName() {
        return dirName;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public Integer getSuccess() {
        return success;
    }

    public Integer getFailed() {
        return failed;
    }

    public Integer getError() {
        return error;
    }

    public Integer getSkipped() {
        return skipped;
    }

    public Long getDuration() {
        return duration;
    }
}
