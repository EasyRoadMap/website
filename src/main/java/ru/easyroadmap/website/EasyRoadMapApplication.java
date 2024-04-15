package ru.easyroadmap.website;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.easyroadmap.website.storage.local.FileSystemStorage;

@OpenAPIDefinition(
        info = @Info(title = "EasyRoadMap API"),
        tags = {
                @Tag(name = "auth", description = "Authentication Service API")
        }
)
@SpringBootApplication
public class EasyRoadMapApplication {

    @Bean
    public FileSystemStorage fileSystemStorage() {
        FileSystemStorage fileSystemStorage = new FileSystemStorage();
        fileSystemStorage.initialize();
        return fileSystemStorage;
    }

    public static void main(String[] args) {
        SpringApplication.run(EasyRoadMapApplication.class, args);
    }

}
