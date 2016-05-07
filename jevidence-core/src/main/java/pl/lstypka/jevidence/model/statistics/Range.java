package pl.lstypka.jevidence.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class Range
{

	@JsonPropertyOrder("leftRange")
	private Long leftRange;

	@JsonPropertyOrder("rightRange")
	private Long rightRange;

	@JsonProperty("value")
	private Integer value = 0;

	public Range(Long leftRange, Long rightRange) {
		this.leftRange = leftRange;
		this.rightRange = rightRange;
	}

	public Long getLeftRange()
	{
		return leftRange;
	}

	public void setLeftRange(Long leftRange)
	{
		this.leftRange = leftRange;
	}

	public Long getRightRange()
	{
		return rightRange;
	}

	public void setRightRange(Long rightRange)
	{
		this.rightRange = rightRange;
	}

	public Integer getValue()
	{
		return value;
	}

	public void setValue(Integer value)
	{
		this.value = value;
	}

	public boolean isMyRange(Long v)
	{
		boolean result = v >= leftRange && v < rightRange;
		return result;
	}

	public void increment()
	{
		value += 1;
	}

	public void add(Integer v) {
		value += v;
	}
}
