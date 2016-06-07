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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.joda.time.format.DateTimeFormat;
import pl.jsolve.sweetener.text.Strings;
import pl.lstypka.jevidence.core.io.FileUtils;
import pl.lstypka.jevidence.core.io.PropertyUtils;
import pl.lstypka.jevidence.core.statistics.DefectCollector;
import pl.lstypka.jevidence.core.statistics.StatisticsCollector;
import pl.lstypka.jevidence.model.defect.Defects;
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.execution.Record;
import pl.lstypka.jevidence.model.execution.Records;
import pl.lstypka.jevidence.model.statistics.Statistics;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Properties;

/**
 * Created by Lukasz on 2016-06-04.
 * Since version 1.1
 */
public class EmbeddedGenerator extends Generator {


    @Override
    public void generate(Execution execution, String reportDir) {
        checkIfVersionsAreMixed(reportDir, JEVIDENCE_EMBEDDED_VERSION);
        try {

            Statistics statistics = new StatisticsCollector().gatherStatistics(execution);
            Defects defects = new DefectCollector().gatherDefects(execution);

            FileUtils fileUtils = new FileUtils();
            ObjectMapper objectMapper = new ObjectMapper();
            String executionDir = execution.getStartedAt().toString(DateTimeFormat.forPattern("yyyy_MM_dd_HH_mm_ss"));
            String destinationPath = createFullPath(reportDir, executionDir);
            fileUtils.createDirs(destinationPath);
            fileUtils.moveScreenshots(execution, reportDir, executionDir);

            Properties properties = new PropertyUtils().readProperty();
            String shouldRemoveExecutions = properties.getProperty(PropertyUtils.REMOVE_EXECUTIONS, PropertyUtils.REMOVE_EXECUTIONS_DEFAULT_VALUE);

            Records records = null;
            String recordsAsString = "";
            String recordsVariableAsString = fileUtils.readAsString(reportDir + File.separator + "data" + File.separator + "records");
            if (Strings.isEmpty(recordsVariableAsString)) {
                records = new Records(Lists.<Record>newArrayList());
            } else {
                recordsAsString = recordsVariableAsString.substring("var jEvidenceRecords = ".length());
                records = objectMapper.readValue(recordsAsString, Records.class);
            }

            updateRecords(execution, records, fileUtils, reportDir, executionDir);
            if ("true".equals(shouldRemoveExecutions)) {
                removeOldExecutions(records, fileUtils, objectMapper, properties, reportDir);
            }
            recordsAsString = objectMapper.writeValueAsString(records);
            recordsVariableAsString = "var jEvidenceRecords = " + recordsAsString;
            fileUtils.saveString(recordsVariableAsString, reportDir + File.separator + "data" + File.separator + "records");
            fileUtils.saveString(createSingleExecutionContent(execution, statistics, defects, objectMapper, executionDir), destinationPath + File.separator + "execution.js");
            updateIndexFile(reportDir, executionDir);
        } catch (IOException ex) {

        }
    }

    private String createSingleExecutionContent(Execution execution, Statistics statistics, Defects defects, ObjectMapper mapper, String executionDir) {
        try {
            String executionAsString = mapper.writeValueAsString(execution);
            String statisticsAsString = mapper.writeValueAsString(statistics);
            String defectsAsString = mapper.writeValueAsString(defects);
            return String.format("var execution_%s = { \"execution\" : %s, \"statistics\" : %s, \"defects\" : %s }", executionDir, executionAsString, statisticsAsString, defectsAsString);
        } catch (JsonProcessingException e) {
            return "";
        }
    }

    private void updateRecords(Execution execution, Records records, FileUtils fileUtils, String reportDir, String executionDirName) {
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

    private void removeOldExecutions(Records records, FileUtils fileUtils, ObjectMapper mapper, Properties properties, String reportDir) throws IOException {
        String maxNumberOfExecutionsProperties = properties.getProperty(PropertyUtils.MAX_NUMBER_OF_EXECUTIONS, PropertyUtils.MAX_NUMBER_OF_EXECUTIONS_DEFAULT_VALUE);
        Integer maxNumberOfExecutions = Integer.valueOf(maxNumberOfExecutionsProperties);
        if (records.getRecords().size() > maxNumberOfExecutions) {
            for (int i = records.getRecords().size() - 1; i >= maxNumberOfExecutions; i--) {
                Record record = records.getRecords().get(i);
                fileUtils.removeExecutionDir(reportDir + File.separator + "data" + File.separator + record.getDirName());
                records.getRecords().remove(i);
                removeOldExecutionsFromIndex(reportDir, record.getDirName());
            }
        }
    }

    private void removeOldExecutionsFromIndex(String reportDir, String executionDir) throws IOException {
        File indexFile = new File(reportDir + File.separator + "index.html");
        String content = org.apache.commons.io.FileUtils.readFileToString(indexFile, Charset.forName("UTF-8"));
        if (!com.google.common.base.Strings.isNullOrEmpty(content)) {
            content = content.replace(String.format("<script src=\"data/%s/execution.js\" type=\"text/javascript\"></script>", executionDir), "");
            org.apache.commons.io.FileUtils.write(indexFile, content, Charset.forName("UTF-8"));
        }
    }

    private String createFullPath(String reportDir, String dirName) {
        return reportDir + File.separator + "data" + File.separator + dirName;
    }

    private void updateIndexFile(String reportDir, String executionDir) throws IOException {
        File indexFile = new File(reportDir + File.separator + "index.html");
        String content = org.apache.commons.io.FileUtils.readFileToString(indexFile, Charset.forName("UTF-8"));
        String replacement = "";
        if (!content.contains("<script src=\"data/records\" type=\"text/javascript\"></script>")) {
            replacement = "<script src=\"data/records\" type=\"text/javascript\"></script>\n\n";
        }

        String executionImport = String.format("<script src=\"data/%s/execution.js\" type=\"text/javascript\"></script>", executionDir);
        if (!content.contains(executionImport)) {
            replacement += executionImport + "\n\n";
        }
        replacement += "</body>";

        content = content.replace("</body>", replacement);
        org.apache.commons.io.FileUtils.write(indexFile, content, Charset.forName("UTF-8"));
    }

}
