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
package pl.lstypka.jevidence.core;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import pl.lstypka.jevidence.core.bo.*;
import pl.lstypka.jevidence.core.exception.JEvidenceException;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.model.execution.Entry;

import java.util.List;
import java.util.Map;
import java.util.Set;


public class EvidenceReporter
{

	private static Map<Long, Traces> traces = Maps.newConcurrentMap();
	private static Set<TestResult> testResults = Sets.newHashSet();
	private static Set<Entry> environmentVariables = Sets.newConcurrentHashSet();
	private static Set<TestLifecycleListener> testLifecycleListeners = Sets.newConcurrentHashSet();

    public static synchronized void startTest()
    {
        traces.put(Thread.currentThread().getId(), new Traces(Lists.<Trace> newArrayList()));
    }

	public static synchronized void step(Step step)
	{
        getTracesForCurrentThread().getTraces().add(step);
	}

	public static synchronized void screenshot(Screenshot screenshot)
	{
        getTracesForCurrentThread().getTraces().add(screenshot);
	}

	public static synchronized void failure(Failure failure)
	{
        getTracesForCurrentThread().getTraces().add(failure);
	}

    public static synchronized Traces getTraces() {
        return getTracesForCurrentThread();
    }

    private static Traces getTracesForCurrentThread() {
        Traces traces = EvidenceReporter.traces.get(Thread.currentThread().getId());
        if(traces == null) {
            throw new JEvidenceException(String.format("Cannot get traces for %s thread. Did you start report (EvidenceReporter.start()) ?", Thread.currentThread().getId()));
        }
        return traces;
    }

	public static synchronized TestResult finishTest()
	{
        Traces testTraces = traces.get(Thread.currentThread().getId());
        traces.remove(Thread.currentThread().getId());
        TestResult testResult = new TestResult(testTraces.getStartedAt(), System.currentTimeMillis(), testTraces.getTraces());
        testResults.add(testResult);
        return testResult;
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
