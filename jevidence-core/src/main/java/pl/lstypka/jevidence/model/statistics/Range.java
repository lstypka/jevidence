/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
		boolean result = leftRange == v || (v >= leftRange && v < rightRange);
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
