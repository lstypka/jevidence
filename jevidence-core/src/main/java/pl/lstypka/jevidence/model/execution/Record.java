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
