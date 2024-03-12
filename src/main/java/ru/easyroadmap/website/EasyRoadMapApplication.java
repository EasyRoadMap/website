package ru.easyroadmap.website;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        info = @Info(title = "EasyRoadMap API"),
        tags = {
                @Tag(name = "auth", description = "Authentication Service API")
        }
)
@SpringBootApplication
public class EasyRoadMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(EasyRoadMapApplication.class, args);
    }

}
