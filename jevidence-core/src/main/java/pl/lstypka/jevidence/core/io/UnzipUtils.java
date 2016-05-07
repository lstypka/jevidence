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