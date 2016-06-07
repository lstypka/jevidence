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
package pl.lstypka.jevidence.core.io;

import com.google.common.base.Strings;

import java.io.*;
import java.util.Properties;

public class PropertyUtils {

    public final static String REPORT_PATH = "jevidence.reportPath";
    public final static String REPORT_PATH_DEFAULT_VALUE = "target" + File.separator + "jevidence";
    public final static String REMOVE_EXECUTIONS = "jevidence.removeExecutions";
    public final static String REMOVE_EXECUTIONS_DEFAULT_VALUE = "true";
    public final static String MAX_NUMBER_OF_EXECUTIONS = "jevidence.maxNumberOfExecutions";
    public final static String MAX_NUMBER_OF_EXECUTIONS_DEFAULT_VALUE = "25";
    public final static String EMBEDDED_VERSION = "jevidence.embedded";
    public final static String EMBEDDED_VERSION_DEFAULT_VALUE = "true";
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
        if(Strings.isNullOrEmpty(path)) {
            return new Properties();
        }
        try {
            File propertiesFile = new File(path);
            Properties properties = new Properties();
            properties.load(new FileInputStream(propertiesFile));
            return properties;
        } catch (IOException e) {
            // do nothing
        }
        return new Properties();
    }
}
