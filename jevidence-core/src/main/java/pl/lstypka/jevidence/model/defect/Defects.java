package pl.lstypka.jevidence.model.defect;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Defects {

    public List<Defect> defects;

    @JsonCreator
    public Defects(@JsonProperty("defects") List<Defect> defects) {
        this.defects = defects;
    }

    public List<Defect> getDefects() {
        return defects;
    }
}
