package pl.lstypka.jevidence.model.execution;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Entry {

    private final String key;
    private final String value;

    @JsonCreator
    public Entry(@JsonProperty("key") String key, @JsonProperty("value") String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Entry entry = (Entry) o;

        return !(key != null ? !key.equals(entry.key) : entry.key != null);

    }

    @Override
    public int hashCode() {
        return key != null ? key.hashCode() : 0;
    }
}
