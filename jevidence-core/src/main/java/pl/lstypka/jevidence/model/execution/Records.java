package pl.lstypka.jevidence.model.execution;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Records {

    private final List<Record> records;

    @JsonCreator
    public Records(@JsonProperty("records") List<Record> records) {
        this.records = records;
    }

    public List<Record> getRecords() {
        return records;
    }
}
