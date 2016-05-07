package pl.lstypka.jevidence.core.io;

import java.io.*;
import java.util.Properties;

public class PropertyUtils {

    public final static String REPORT_PATH = "jevidence.reportPath";
    public final static String REMOVE_EXECUTIONS = "jevidence.removeExecutions";
    public final static String MAX_NUMBER_OF_EXECUTIONS = "jevidence.maxNumberOfExecutions";
    private final static String JEVIDENCE_PROPERTIES_FILE = "jevidence.properties";
    private final static String JEVIDENCE_ENVIRONMENT_KEY = "JEVIDENCE_PROPERTIES";

    public Properties readProperty() {

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(JEVIDENCE_PROPERTIES_FILE);
        Properties properties = new Properties();
        try {
            if (inputStream != null) {
                properties.load(inputStream);
                return properties;
            }
        } catch (IOException e) {
            // do nothing
        }

        String jevidencePropertiesPath = System.getenv(JEVIDENCE_ENVIRONMENT_KEY);
        properties = readProperties(jevidencePropertiesPath);
        if (properties != null) {
            return properties;
        }
        return System.getProperties();
    }

    private Properties readProperties(String path) {
        try {
            File propertiesFile = new File(path);
            Properties properties = new Properties();
            properties.load(new FileInputStream(propertiesFile));
            return properties;
        } catch (IOException e) {
            // do nothing
        }
        return null;
    }
}
