package pl.lstypka.jevidence.core;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import pl.lstypka.jevidence.core.bo.*;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.model.execution.Entry;

import java.util.Map;
import java.util.Set;


public class EvidenceReporter
{

	private static Map<Long, Traces> traces = Maps.newConcurrentMap();
	private static Set<Entry> environmentVariables = Sets.newConcurrentHashSet();
	private static Set<TestLifecycleListener> testLifecycleListeners = Sets.newConcurrentHashSet();

	public static synchronized void step(Step step)
	{
		traces.get(Thread.currentThread().getId()).getTraces().add(step);
	}

	public static synchronized void screenshot(Screenshot screenshot)
	{
		traces.get(Thread.currentThread().getId()).getTraces().add(screenshot);
	}

	public static synchronized void failure(Failure failure)
	{
		traces.get(Thread.currentThread().getId()).getTraces().add(failure);
	}

	public static synchronized void startTest()
	{
		traces.put(Thread.currentThread().getId(), new Traces(Lists.<Trace> newArrayList()));
	}

	public static synchronized Traces finishTest()
	{
		return traces.get(Thread.currentThread().getId());
	}

	public static void registerListener(TestLifecycleListener listener) {
		testLifecycleListeners.add(listener);
	}

	public static Set<TestLifecycleListener> getListeners() {
		return testLifecycleListeners;
	}

	public static Set<Entry> getEnvironmentVariables() {
		return environmentVariables;
	}

	public static synchronized void addEnvironmentVariable(Entry entry) {
		environmentVariables.add(entry);
	}
}
