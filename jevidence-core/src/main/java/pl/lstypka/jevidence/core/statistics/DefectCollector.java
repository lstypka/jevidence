package pl.lstypka.jevidence.core.statistics;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import pl.lstypka.jevidence.model.defect.Defect;
import pl.lstypka.jevidence.model.defect.Defects;
import pl.lstypka.jevidence.model.defect.TestLight;
import pl.lstypka.jevidence.model.execution.*;

import java.util.List;
import java.util.Map;

public class DefectCollector {

    public Defects gatherDefects(Execution execution) {
        if (execution.getErrors() == 0 && execution.getFailed() == 0) {
            return new Defects(Lists.<Defect>newArrayList());
        }
        Map<DefectKey, Defect> defects = Maps.newHashMap();

        for (TestClass testClass : execution.getTestClasses()) {
            if (testClass.getFailed() != 0 || testClass.getErrors() != 0) {
                for (Test test : testClass.getTests()) {
                    if (test.getStatus() == Status.ERROR || test.getStatus() == Status.FAILED) {
                        for (Step step : test.getSteps()) {
                            if (step.getThrowable() != null) {
                                DefectKey defectKey = new DefectKey(step.getThrowable().getClass().getName(), step.getThrowable().getMessage());
                                Defect foundDefect = defects.get(defectKey);
                                if (foundDefect == null) {
                                    List<TestLight> tests = Lists.newArrayList();
                                    foundDefect = new Defect(tests, step.getThrowable().getClass().getName(), step.getThrowable().getMessage());
                                    defects.put(defectKey, foundDefect);
                                }
                                TestLight testLight = new TestLight(testClass.getName(), test.getName(), test.getParams());
                                foundDefect.getTests().add(testLight);
                            }
                        }
                    }
                }
            }
        }
        return new Defects(Lists.newArrayList(defects.values()));
    }

    private class DefectKey {
        private String exceptionClassName;
        private String message;

        public DefectKey(String exceptionClassName, String message) {
            this.exceptionClassName = exceptionClassName;
            this.message = message;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            DefectKey defectKey = (DefectKey) o;

            if (exceptionClassName != null ? !exceptionClassName.equals(defectKey.exceptionClassName) : defectKey.exceptionClassName != null)
                return false;
            return !(message != null ? !message.equals(defectKey.message) : defectKey.message != null);

        }

        @Override
        public int hashCode() {
            int result = exceptionClassName != null ? exceptionClassName.hashCode() : 0;
            result = 31 * result + (message != null ? message.hashCode() : 0);
            return result;
        }
    }

}
