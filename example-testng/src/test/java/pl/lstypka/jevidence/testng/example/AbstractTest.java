package pl.lstypka.jevidence.testng.example;


import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Listeners;
import pl.lstypka.jevidence.core.EvidenceReporter;
import pl.lstypka.jevidence.core.listeners.TestLifecycle;
import pl.lstypka.jevidence.core.listeners.TestLifecycleListener;
import pl.lstypka.jevidence.listener.JEvidenceTestNgListener;
import pl.lstypka.jevidence.logger.JEvidenceLog4jHandler;
import pl.lstypka.jevidence.logger.JEvidenceUtilLoggerHandler;

import java.util.logging.Logger;

@Listeners(JEvidenceTestNgListener.class)
public class AbstractTest {

    private static final Logger LOG = Logger.getLogger(AbstractTest.class.getName());
    org.apache.log4j.Logger LOG4J = org.apache.log4j.Logger.getLogger(AbstractTest.class.getName());

    @BeforeSuite
    public void before() {
        LOG.getParent().addHandler(new JEvidenceUtilLoggerHandler());
        org.apache.log4j.Logger LOG4J = org.apache.log4j.Logger.getLogger(AbstractTest.class.getName());
        LOG4J.getParent().addAppender(new JEvidenceLog4jHandler());

        EvidenceReporter.registerListener(new TestLifecycleListener() {
            public void onSuiteStart() {

            }

            public void onSuiteFinish() {

            }

            public void onTestStart(TestLifecycle testResult) {
                LOG.info("Test started listener");
            }

            public void onTestSuccess(TestLifecycle testResult) {
                LOG.info("Test success listener");
            }

            public void onTestFailure(TestLifecycle testResult) {
                LOG.info("Test failure listener");
            }

            public void onTestSkipped(TestLifecycle testResult) {
                LOG.info("Test skipped listener");
            }
        });
    }
}
