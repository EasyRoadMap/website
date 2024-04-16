package ru.easyroadmap.website;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.easyroadmap.website.storage.local.FileSystemStorage;

@OpenAPIDefinition(
        info = @Info(title = "EasyRoadMap API"),
        tags = {
                @Tag(name = "auth", description = "Authentication Service API"),
                @Tag(name = "project-api", description = "Projects RESTful API"),
                @Tag(name = "workspace-api", description = "Workspaces RESTful API"),
                @Tag(name = "user-api", description = "Users RESTful API")
        }
)
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
