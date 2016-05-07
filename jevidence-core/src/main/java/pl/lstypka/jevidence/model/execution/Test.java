package pl.lstypka.jevidence.model.execution;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.DateTime;
import pl.lstypka.jevidence.core.io.JEvidenceDateTimeSerializer;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Test implements Serializable {

    @JsonProperty("steps")
    private List<Step> steps;

    @JsonProperty("status")
    private Status status;

    @JsonProperty("name")
    private String name;

    @JsonProperty("params")
    private Map<String, String> params;

    @JsonProperty("startedAt")
    @JsonSerialize(using = JEvidenceDateTimeSerializer.class)
    private DateTime startedAt;

    @JsonProperty("finishedAt")
    @JsonSerialize(using = JEvidenceDateTimeSerializer.class)
    private DateTime finishedAt;

    @JsonProperty("duration")
    private Long duration;

    public Test(String name) {
        this.name = name;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
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
}
