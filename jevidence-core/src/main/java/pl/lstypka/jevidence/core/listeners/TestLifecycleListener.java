package pl.lstypka.jevidence.core.listeners;

public interface TestLifecycleListener {

    void onSuiteStart();

    void onSuiteFinish();

    void onTestStart(TestLifecycle testResult);

    void onTestSuccess(TestLifecycle testResult);

    void onTestFailure(TestLifecycle testResult);

    void onTestSkipped(TestLifecycle testResult);

}
