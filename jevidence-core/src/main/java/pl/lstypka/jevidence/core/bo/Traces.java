package pl.lstypka.jevidence.core.bo;

import java.util.List;

public class Traces {

    private List<Trace> traces;
    private Long startedAt;

    public Traces(List<Trace> traces) {
        this.traces = traces;
        this.startedAt = System.currentTimeMillis();
    }

    public List<Trace> getTraces() {
        return traces;
    }

    public Long getStartedAt() {
        return startedAt;
    }
}
