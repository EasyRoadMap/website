package ru.easyroadmap.website.storage.local;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import ru.easyroadmap.website.util.RecursiveDeleterVisitor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
public final class FileSystemStorage {

    private final Path dataDirectory;

    @SneakyThrows
    public FileSystemStorage(String dataDirectoryPath) {
        this.dataDirectory = Paths.get(dataDirectoryPath.replace('/', File.separatorChar));

        if (!Files.isDirectory(dataDirectory)) {
            Files.createDirectories(dataDirectory);
            log.info("Created a new data directory.");
        }
    }

    public Path getPath(String relativePath) {
        return dataDirectory.resolve(relativePath.replace('/', File.separatorChar));
    }

    public boolean delete(Path path) throws IOException {
        if (Files.isRegularFile(path)) {
            Files.delete(path);
            return true;
        }

        if (Files.isDirectory(path)) {
            Files.walkFileTree(path, new RecursiveDeleterVisitor());
            return true;
        }

        return false;
    }

}
