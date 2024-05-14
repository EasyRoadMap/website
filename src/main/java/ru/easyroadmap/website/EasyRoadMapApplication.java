package ru.easyroadmap.website;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.easyroadmap.website.storage.local.FileSystemStorage;

@SpringBootApplication
public class EasyRoadMapApplication {

    @Value("${server.storage.data-directory}")
    private String dataDirectoryPath;

    @Bean
    public FileSystemStorage fileSystemStorage() {
        return new FileSystemStorage(dataDirectoryPath);
    }

    public static void main(String[] args) {
        SpringApplication.run(EasyRoadMapApplication.class, args);
    }

}
