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
package pl.lstypka.jevidence.model.defect;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class TestLight {

    private final String className;
    private final String testName;
    private final Map<String, String> params;

    @JsonCreator
    public TestLight(@JsonProperty("className") String className,
                     @JsonProperty("testName") String testName,
                     @JsonProperty("params") Map<String, String> params) {
        this.className = className;
        this.testName = testName;
        this.params = params;
    }

    public String getClassName() {
        return className;
    }

    public String getTestName() {
        return testName;
    }

    public Map<String, String> getParams() {
        return params;
    }
}
