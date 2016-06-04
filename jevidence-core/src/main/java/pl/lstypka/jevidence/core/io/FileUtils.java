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


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import org.joda.time.format.DateTimeFormat;
import pl.lstypka.jevidence.core.exception.JEvidenceException;
import pl.lstypka.jevidence.core.statistics.DefectCollector;
import pl.lstypka.jevidence.core.statistics.StatisticsCollector;
import pl.lstypka.jevidence.model.defect.Defects;
import pl.lstypka.jevidence.model.execution.*;
import pl.lstypka.jevidence.model.statistics.Statistics;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class FileUtils {

    private final static String pathSeparator = File.separator;

    public void createDirs(String path) {
        File executionDir = new File(path);
        executionDir.mkdirs();
    }

    public void saveExecution(Execution execution, ObjectMapper objectMapper, String destination) {
        try {
            objectMapper.writeValue(new File(destination + pathSeparator + "execution.json"), execution);
        } catch (IOException e) {
            throw new JEvidenceException("Exception occurred while saving execution.json", e);
        }
    }

    public void saveStatistics(Statistics statistics, ObjectMapper objectMapper, String destination) {
        try {
            objectMapper.writeValue(new File(destination + pathSeparator + "statistics.json"), statistics);
        } catch (IOException e) {
            throw new JEvidenceException("Exception occurred while saving statistics.json", e);
        }
    }

    public void saveDefects(Defects defects, ObjectMapper objectMapper, String destination) {
        try {
            objectMapper.writeValue(new File(destination + pathSeparator + "defects.json"), defects);
        } catch (IOException e) {
            throw new JEvidenceException("Exception occurred while saving defects.json", e);
        }
    }

    public void saveRecords(Records records, ObjectMapper objectMapper, String destination) {
        try {
            objectMapper.writeValue(new File(destination + pathSeparator + "records"), records);
        } catch (IOException e) {
            throw new JEvidenceException("Exception occurred while saving records", e);
        }
    }

    public Records readRecords(ObjectMapper objectMapper, String recordsFile) {
        try {
            return objectMapper.readValue(new File(recordsFile + File.separator + "records"), Records.class);
        } catch (IOException e) {
            return new Records(Lists.<Record>newArrayList());
        }
    }

    public void removeExecutionDir(String executionDir) {
        try {
            delete(new File(executionDir));
        } catch (IOException e) {
            throw new JEvidenceException("Exception occurred while removing old execution", e);
        }
    }

    private void delete(File f) throws IOException {
        if (f.isDirectory()) {
            for (File file : f.listFiles()) {
                delete(file);
            }
        }
        f.delete();
    }

    public void moveScreenshots(Execution execution, String reportDir, String executionDir) {
        String imgDir = "data" + pathSeparator + executionDir + pathSeparator + "img";
        String fullPath = createFullPath(reportDir, executionDir + pathSeparator + "img");
        createDirs(fullPath);
        for (TestClass testClass : execution.getTestClasses()) {
            for (Test test : testClass.getTests()) {
                for (Step step : test.getSteps()) {
                    if (step.getScreenshotFile() != null) {
                        try {
                            Files.copy(step.getScreenshotFile(), new File(fullPath, step.getScreenshotFile().getName()));
                            step.setScreenshot(imgDir + pathSeparator + step.getScreenshotFile().getName());
                            step.setScreenshotFile(null);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }

    private String createFullPath(String reportDir, String dirName) {
        return reportDir + pathSeparator + "data" + pathSeparator + dirName;
    }

    public boolean checkIfFileExists(String fileDir) {
        return new File(fileDir).exists();
    }

    public void createFileIfNotExist(String filePath) {
        if (!checkIfFileExists(filePath)) {
            try {
                new File(filePath).createNewFile();
            } catch (IOException e) {
                throw new JEvidenceException("Exception occurred while saving records.json", e);
            }
        }
    }
}
