package pl.lstypka.jevidence.example.testng;


import java.util.Random;
import java.util.logging.Logger;

import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.bo.Step;


public class ExampleService
{

	private static final Logger LOG = Logger.getLogger(ExampleService.class.getName());
	org.apache.log4j.Logger LOG4J = org.apache.log4j.Logger.getLogger(ExampleService.class.getName());

	public Integer getFirstNumber(Integer number)
	{
		Integer nops = new Random().nextInt(5);
		for(int i = 0; i < nops; i++) {
			nop();
		}
		LOG.info("JAVA UTIL LOGGER: first number " + number);
		LOG4J.info("LOG4J: first number " + number);
		EvidenceReporter.step(new Step("first number = " + number));
		return number;
	}

	public void nop() {
		sleep();
		EvidenceReporter.step(new Step("Nop"));
	}

	private void sleep()
	{
		try
		{
			Thread.sleep((long) (Math.random() * 25));
		}
		catch (InterruptedException e)
		{
			e.printStackTrace();
		}
	}

	public Integer getSecondNumber(Integer number)
	{
		Integer nops = new Random().nextInt(50);
		for(int i = 0; i < nops; i++) {
			nop();
		}
		sleep();
		LOG.info("JAVA UTIL LOGGER: second number " + number);
		LOG4J.info("LOG4J: second number " + number);
		EvidenceReporter.step(new Step("Second number = " + number));
		return number;
	}

	public Integer sum(Integer first, Integer second)
	{
		randomError();
		sleep();
		EvidenceReporter.step(new Step("Sum = " + (first + second)));
		return first + second;
	}

	public Integer subtract(Integer first, Integer second) {
		randomError();
		sleep();
		EvidenceReporter.step(new Step("Substract = " + (first + second)));
		return first - second;
	}


	public Integer multiply(Integer first, Integer second) {
		randomError();
		sleep();
		EvidenceReporter.step(new Step("Multiply = " + (first + second)));
		return first * second;
	}

	private void randomError() {
		if(new Random().nextInt(5) == 2) {
			throw new RuntimeException("Random error");
		}
	}

	public void error()
	{
		throw new NullPointerException();
	}

}
