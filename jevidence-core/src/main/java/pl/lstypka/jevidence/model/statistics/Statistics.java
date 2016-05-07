package pl.lstypka.jevidence.model.statistics;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;


public class Statistics implements Serializable
{

	@JsonProperty("testsResultsInPercentage")
	private TestsResultsInPercentage testsResultsInPercentage;

	@JsonProperty("numberOfSteps")
	private NumberOfSteps numberOfSteps;

	@JsonProperty("testExecutionTime")
	private TestExecutionTime testExecutionTime;

	public TestsResultsInPercentage getTestsResultsInPercentage()
	{
		return testsResultsInPercentage;
	}

	public void setTestsResultsInPercentage(TestsResultsInPercentage testsResultsInPercentage)
	{
		this.testsResultsInPercentage = testsResultsInPercentage;
	}

	public NumberOfSteps getNumberOfSteps()
	{
		return numberOfSteps;
	}

	public void setNumberOfSteps(NumberOfSteps numberOfSteps)
	{
		this.numberOfSteps = numberOfSteps;
	}

	public TestExecutionTime getTestExecutionTime()
	{
		return testExecutionTime;
	}

	public void setTestExecutionTime(TestExecutionTime testExecutionTime)
	{
		this.testExecutionTime = testExecutionTime;
	}
}
