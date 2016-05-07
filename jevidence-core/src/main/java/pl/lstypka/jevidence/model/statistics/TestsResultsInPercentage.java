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
