package pl.lstypka.jevidence.runner;

import org.junit.runner.notification.RunNotifier;
import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.InitializationError;
import pl.lstypka.jevidence.listener.JUnitExecutionListener;

public class JEvidenceJUnitRunner extends BlockJUnit4ClassRunner {

    private static JUnitExecutionListener jUnitExecutionListener = new JUnitExecutionListener();

    public JEvidenceJUnitRunner(Class<?> klass) throws InitializationError {
        super(klass);
    }

    @Override
    public void run(RunNotifier notifier) {
        notifier.removeListener(jUnitExecutionListener);
        notifier.addListener(jUnitExecutionListener);
        super.run(notifier);
    }
}