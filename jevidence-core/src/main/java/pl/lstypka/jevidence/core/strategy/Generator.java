/**
 * Copyright (C) 2016 Lukasz Stypka (lukasz.stypka@gmail.com)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package pl.lstypka.jevidence.core.strategy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import pl.lstypka.jevidence.core.io.FileUtils;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.settings.Setting;
import pl.lstypka.jevidence.model.settings.Settings;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

/**
 * Created by Lukasz on 2016-06-04.
 * Since version 1.1
 */
public abstract class Generator {

    private final static String JEVIDENCE_DEPLOY_TYPE_KEY = "deployType";
    protected final static String JEVIDENCE_EMBEDDED_VERSION = "embedded";
    protected final static String JEVIDENCE_SERVER_VERSION = "server";
    protected String zipFilePath = "client.zip";

    public abstract void generate(Execution execution, String reportDir);

    protected void checkIfVersionsAreMixed(String reportDir, String jevidenceDeploymentVersion) {
        if (!checkIfClientIsAppropriate(reportDir, jevidenceDeploymentVersion)) {
            throw new IllegalStateException("Cannot mix embedded and server versions ");
        }
    }

    private boolean checkIfClientIsAppropriate(String reportDir, String jEvidenceDeploymentVersion) {
        File settingsFile = new File(reportDir + File.separator + "data" + File.separator + "settings.js");
        ObjectMapper mapper = new ObjectMapper();
        if (settingsFile.exists()) {
            try {
                FileUtils fileUtils = new FileUtils();
                Settings settings = null;
                String settingsVariableAsString = fileUtils.readAsString(settingsFile.getAbsolutePath());
                if (isAlpha(settingsVariableAsString)) {
                    settings = new Settings(Lists.<Setting>newArrayList());
                } else {
                    String settingsAsString = settingsVariableAsString.substring("var jEvidenceSettings = ".length());
                    settings = mapper.readValue(settingsAsString, Settings.class);
                }
                for (Setting setting : settings.getSettings()) {
                    if (setting.getKey().equals(JEVIDENCE_DEPLOY_TYPE_KEY)) {
                        return setting.getValue().equals(jEvidenceDeploymentVersion);
                    }
                }
                saveSettings(settings, jEvidenceDeploymentVersion, settingsFile, mapper);
                return true;
            } catch (IOException e) {
                return false;
            }
        } else {
            try {
                new File(reportDir + File.separator + "data").mkdirs();
                settingsFile.createNewFile();
                saveSettings(new Settings(Lists.<Setting>newArrayList()), jEvidenceDeploymentVersion, settingsFile, mapper);
                return true;
            } catch (IOException e) {
                return false;
            }
        }
    }

    private boolean isAlpha(String name) {
        return name.matches("[a-zA-Z]+");
    }

    private void saveSettings(Settings settings, String jevidenceDeploymentVersion, File settingsFile, ObjectMapper mapper) {
        try {
            // JEVIDENCE_DEPLOY_TYPE_KEY key not found. Add it!
            settings.getSettings().add(new Setting(JEVIDENCE_DEPLOY_TYPE_KEY, jevidenceDeploymentVersion));
            String settingsAsString = mapper.writeValueAsString(settings);
            //save it!
            FileUtils fileUtils = new FileUtils();
            fileUtils.saveString("var jEvidenceSettings = " + settingsAsString, settingsFile.getAbsolutePath());
        } catch (IOException e) {
            // do nothing
        }
    }

    protected void updateJevidenceTimestamp(String reportDir) throws IOException {
        File indexFile = new File(reportDir + File.separator + "index.html");
        String content = org.apache.commons.io.FileUtils.readFileToString(indexFile, Charset.forName("UTF-8"));
        if (content.contains("JEVIDENCE_TIMESTAMP")) {
            content = content.replace("JEVIDENCE_TIMESTAMP", DateTime.now().toString("YYYY-MM-dd HH:mm:ss"));
            org.apache.commons.io.FileUtils.write(indexFile, content, Charset.forName("UTF-8"));
        }
    }
}
