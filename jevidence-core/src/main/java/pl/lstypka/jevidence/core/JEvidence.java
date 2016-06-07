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


import com.fasterxml.jackson.databind.ObjectMapper;
import org.joda.time.format.DateTimeFormat;
import pl.lstypka.jevidence.core.io.FileUtils;
import pl.lstypka.jevidence.core.io.PropertyUtils;
import pl.lstypka.jevidence.core.io.UnzipUtils;
import pl.lstypka.jevidence.core.statistics.DefectCollector;
import pl.lstypka.jevidence.core.statistics.StatisticsCollector;
import pl.lstypka.jevidence.core.strategy.EmbeddedGenerator;
import pl.lstypka.jevidence.core.strategy.Generator;
import pl.lstypka.jevidence.core.strategy.ServerGenerator;
import pl.lstypka.jevidence.model.defect.Defects;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Record;
import pl.lstypka.jevidence.model.execution.Records;
import pl.lstypka.jevidence.model.statistics.Statistics;

import java.io.File;
import java.io.InputStream;
import java.util.Properties;

public class JEvidence {

    String zipFilePath = "client.zip";

    public void generate(Execution execution) {
        PropertyUtils propertyUtils = new PropertyUtils();
        Properties properties = propertyUtils.readProperty();
        String reportDir = properties.getProperty(PropertyUtils.REPORT_PATH, PropertyUtils.REPORT_PATH_DEFAULT_VALUE);
        generate(execution, reportDir);
    }

    public void generate(Execution execution, String reportDir) {
        FileUtils fileUtils = new FileUtils();
        if (!fileUtils.checkIfFileExists(reportDir + File.separator + "index.html")) {
            InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream(zipFilePath);
            UnzipUtils unzipUtils = new UnzipUtils(resourceAsStream, reportDir);
            unzipUtils.unzip();
        }

        Generator generator = new ServerGenerator();

        PropertyUtils propertyUtils = new PropertyUtils();
        Properties properties = propertyUtils.readProperty();
        String embeddedVersion = properties.getProperty(PropertyUtils.EMBEDDED_VERSION);

        if("true".equals(embeddedVersion)) {
            generator = new EmbeddedGenerator();
        }
        generator.generate(execution, reportDir);
    }

}
