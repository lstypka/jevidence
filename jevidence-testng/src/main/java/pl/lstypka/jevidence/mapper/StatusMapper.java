package pl.lstypka.jevidence.mapper;

import org.testng.ITestResult;
import pl.lstypka.jevidence.model.execution.Status;


public class StatusMapper
{

	public static Status getStatus(ITestResult testResult)
	{
		switch (testResult.getStatus())
		{
			case 1:
				return Status.SUCCESS;
			case 2:
				if (isError(testResult.getThrowable()))
				{
					return Status.ERROR;
				}
				else
				{
					return Status.FAILED;
				}
			case 3:
				return Status.SKIPPED;
			default:
				return Status.UNKNOWN;
		}
	}


	private static boolean isError(Throwable t)
	{
		return t == null ? false : t instanceof AssertionError ? false : true;
	}

}
