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
import org.joda.time.format.DateTimeFormat;
import pl.lstypka.jevidence.core.io.FileUtils;
import pl.lstypka.jevidence.core.io.PropertyUtils;
import pl.lstypka.jevidence.core.io.UnzipUtils;
import pl.lstypka.jevidence.core.statistics.DefectCollector;
import pl.lstypka.jevidence.core.statistics.StatisticsCollector;
import pl.lstypka.jevidence.model.defect.Defects;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Record;
import pl.lstypka.jevidence.model.execution.Records;
import pl.lstypka.jevidence.model.statistics.Statistics;

import java.io.File;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by Lukasz on 2016-06-04.
 * Since version 1.1
 */
public class ServerGenerator extends Generator{

    @Override
    public void generate(Execution execution, String reportDir) {
        checkIfVersionsAreMixed(reportDir, JEVIDENCE_SERVER_VERSION);
        FileUtils fileUtils = new FileUtils();

        Statistics statistics = new StatisticsCollector().gatherStatistics(execution);
        Defects defects = new DefectCollector().gatherDefects(execution);

        ObjectMapper objectMapper = new ObjectMapper();
        String executionDir = execution.getStartedAt().toString(DateTimeFormat.forPattern("yyyy_MM_dd_HH_mm_ss"));
        String destinationPath = createFullPath(reportDir, executionDir);
        fileUtils.createDirs(destinationPath);
        fileUtils.moveScreenshots(execution, reportDir, executionDir);
        fileUtils.saveExecution(execution, objectMapper, destinationPath);
        fileUtils.saveStatistics(statistics, objectMapper, destinationPath);
        fileUtils.saveDefects(defects, objectMapper, destinationPath);

        Properties properties = new PropertyUtils().readProperty();
        String shouldRemoveExecutions = properties.getProperty(PropertyUtils.REMOVE_EXECUTIONS, "false");
        Records records = fileUtils.readRecords(objectMapper, reportDir + File.separator + "data");
        updateRecords(execution, records, fileUtils, reportDir, executionDir);
        if ("true".equals(shouldRemoveExecutions)) {
            removeOldExecutions(records, fileUtils, objectMapper, properties, reportDir);
        }
        fileUtils.saveRecords(records, objectMapper, reportDir + File.separator + "data");
    }

    private void updateRecords(Execution execution, Records records, FileUtils fileUtils,String reportDir, String executionDirName) {
        try {
            String dataDir = reportDir + File.separator + "data";
            fileUtils.createFileIfNotExist(dataDir);

            if (records.getRecords().isEmpty() || (!records.getRecords().isEmpty() && !records.getRecords().get(0).getDirName().equals(executionDirName))) {
                int sum = execution.getPassed() + execution.getErrors() + execution.getFailed();
                int percentage = (int) (((double) execution.getPassed() / sum) * 100);
                int recordId = 1;
                if (records.getRecords().size() > 0) {
                    recordId = Integer.valueOf(records.getRecords().get(0).getId()) + 1;
                }
                records.getRecords().add(0, new Record(String.valueOf(recordId), executionDirName, percentage, execution.getDuration(), execution.getPassed(), execution.getFailed(), execution.getErrors(), execution.getSkipped()));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void removeOldExecutions(Records records, FileUtils fileUtils, ObjectMapper mapper, Properties properties, String reportDir) {
        String maxNumberOfExecutionsProperties = properties.getProperty(PropertyUtils.MAX_NUMBER_OF_EXECUTIONS, "" + Integer.MAX_VALUE);
        Integer maxNumberOfExecutions = Integer.valueOf(maxNumberOfExecutionsProperties);
        if (records.getRecords().size() > maxNumberOfExecutions) {
            for (int i = records.getRecords().size() - 1; i >= maxNumberOfExecutions; i--) {
                Record record = records.getRecords().get(i);
                fileUtils.removeExecutionDir(reportDir + File.separator + "data" + File.separator + record.getDirName());
                records.getRecords().remove(i);
            }
        }
    }

    private String createFullPath(String reportDir, String dirName) {
        return reportDir + File.separator + "data" + File.separator + dirName;
    }
}
