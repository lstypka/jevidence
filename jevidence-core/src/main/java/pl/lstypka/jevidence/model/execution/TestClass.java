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

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import pl.lstypka.jevidence.core.io.JEvidenceDateTimeSerializer;

import java.io.Serializable;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TestClass implements Serializable {

    @JsonProperty("name")
    private String name;

    @JsonProperty("tests")
    private List<Test> tests;

    @JsonProperty("skipped")
    private Integer skipped;

    @JsonProperty("failed")
    private Integer failed;

    @JsonProperty("errors")
    private Integer errors;

    @JsonProperty("passed")
    private Integer passed;

    @JsonProperty("startedAt")
    @JsonSerialize(using = JEvidenceDateTimeSerializer.class)
    private DateTime startedAt;

    @JsonProperty("finishedAt")
    @JsonSerialize(using = JEvidenceDateTimeSerializer.class)
    private DateTime finishedAt;

    @JsonProperty("duration")
    private Long duration;

    public TestClass(String name) {
        this.name = name;
        this.tests = Lists.newArrayList();
        this.skipped = 0;
        this.failed = 0;
        this.errors = 0;
        this.passed = 0;
    }

    public String getName() {
        return name;
    }

    public List<Test> getTests() {
        return tests;
    }

    public void setTests(List<Test> tests) {
        this.tests = tests;
    }

    public Integer getSkipped() {
        return skipped;
    }

    public void setSkipped(Integer skipped) {
        this.skipped = skipped;
    }

    public Integer getFailed() {
        return failed;
    }

    public void setFailed(Integer failed) {
        this.failed = failed;
    }

    public Integer getErrors() {
        return errors;
    }

    public void setErrors(Integer errors) {
        this.errors = errors;
    }

    public Integer getPassed() {
        return passed;
    }

    public void setPassed(Integer passed) {
        this.passed = passed;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(DateTime startedAt) {
        this.startedAt = startedAt;
    }

    public DateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(DateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Test addTest(Test test) {
        this.tests.add(test);
        return test;
    }
}
