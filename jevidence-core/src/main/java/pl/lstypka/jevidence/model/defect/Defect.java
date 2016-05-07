package pl.lstypka.jevidence.model.defect;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Defect {

    private List<TestLight> tests;
    private String exceptionClassName;
    private String exceptionMessage;

    @JsonCreator
    public Defect(@JsonProperty("tests") List<TestLight> tests,
                  @JsonProperty("exceptionClassName") String exceptionClassName,
                  @JsonProperty("exceptionMessage") String exceptionMessage) {
        this.tests = tests;
        this.exceptionClassName = exceptionClassName;
        this.exceptionMessage = exceptionMessage;
    }

    public List<TestLight> getTests() {
        return tests;
    }

    public String getExceptionClassName() {
        return exceptionClassName;
    }

    public String getExceptionMessage() {
        return exceptionMessage;
    }
}
