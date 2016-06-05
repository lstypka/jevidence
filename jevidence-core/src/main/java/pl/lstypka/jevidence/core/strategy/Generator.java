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
package pl.lstypka.jevidence.core.strategy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.settings.Setting;
import pl.lstypka.jevidence.model.settings.Settings;

import java.io.File;
import java.io.IOException;

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

    private boolean checkIfClientIsAppropriate(String reportDir, String jevidenceDeploymentVersion) {
        File settingsFile = new File(reportDir + File.separator + "data" + File.separator + "settings.json");
        ObjectMapper mapper = new ObjectMapper();
        if (settingsFile.exists()) {
            try {
                Settings settings = mapper.readValue(settingsFile, Settings.class);
                for (Setting setting : settings.getSettings()) {
                    if (setting.getKey().equals(JEVIDENCE_DEPLOY_TYPE_KEY)) {
                        return setting.getValue().equals(jevidenceDeploymentVersion);
                    }
                }
                saveSettings(settings, jevidenceDeploymentVersion, settingsFile, mapper);
                return true;
            } catch (IOException e) {
                return false;
            }
        } else {
            try {
                new File(reportDir + File.separator + "data").mkdirs();
                settingsFile.createNewFile();
                saveSettings(new Settings(Lists.<Setting>newArrayList()), jevidenceDeploymentVersion, settingsFile, mapper);
                return true;
            } catch (IOException e) {
                return false;
            }
        }
    }

    private void saveSettings(Settings settings,  String jevidenceDeploymentVersion, File settingsFile, ObjectMapper mapper) {
        try {
            // JEVIDENCE_DEPLOY_TYPE_KEY key not found. Add it!
            settings.getSettings().add(new Setting(JEVIDENCE_DEPLOY_TYPE_KEY, jevidenceDeploymentVersion));
            //save it!
            mapper.writeValue(settingsFile, settings);
        } catch (IOException e) {
            // do nothing
        }
    }
}
