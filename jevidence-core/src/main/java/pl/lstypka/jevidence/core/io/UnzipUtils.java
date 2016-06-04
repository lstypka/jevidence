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

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class UnzipUtils {

    private final InputStream zipPath;
    private final String destinationPath;

    public UnzipUtils(final InputStream zipPath, final String destinationPath) {
        this.zipPath = zipPath;
        this.destinationPath = destinationPath;
    }

    public void unzip() {
        prepareDestinationDir();
        byte[] buffer = new byte[1024];
        try {
            ZipInputStream zis = new ZipInputStream(zipPath);
            ZipEntry ze = zis.getNextEntry();
            while (ze != null) {

                String fileName = ze.getName();

                File newFile = new File(destinationPath + File.separator + fileName);
                if(ze.isDirectory()) {
                    newFile.mkdirs();
                } else {
                    new File(newFile.getParent()).mkdirs();
                    FileOutputStream fos = new FileOutputStream(newFile);

                    int len;
                    while ((len = zis.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }

                    fos.close();
                }
                ze = zis.getNextEntry();
            }

            zis.closeEntry();
            zis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void prepareDestinationDir() {
        File folder = new File(destinationPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }
    }
}