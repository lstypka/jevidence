package pl.lstypka.jevidence.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class NumberOfSteps implements Serializable {

    @JsonProperty("ranges")
    private List<Range> ranges;

    public NumberOfSteps(List<Range> ranges) {
        this.ranges = ranges;
    }

    public List<Range> getRanges() {
        return ranges;
    }

}
