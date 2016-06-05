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
import pl.lstypka.jevidence.model.execution.Execution;
import pl.lstypka.jevidence.model.settings.Setting;
import pl.lstypka.jevidence.model.settings.Settings;

import java.io.File;
import java.io.IOException;

/**
 * Created by Lukasz on 2016-06-04.
 * Since version 1.1
 */
public class EmbeddedGenerator extends Generator {


    @Override
    public void generate(Execution execution, String reportDir) {
        checkIfVersionsAreMixed(reportDir, JEVIDENCE_EMBEDDED_VERSION);
    }


}
