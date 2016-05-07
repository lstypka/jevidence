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
