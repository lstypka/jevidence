package pl.lstypka.jevidence.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;


public class TestExecutionTime implements Serializable
{
	@JsonProperty("ranges")
	private List<Range> ranges;

	public TestExecutionTime(List<Range> ranges)
	{
		this.ranges = ranges;
	}

	public List<Range> getRanges()
	{
		return ranges;
	}



}
