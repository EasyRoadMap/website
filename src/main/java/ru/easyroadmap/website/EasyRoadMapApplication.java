package ru.easyroadmap.website;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(info = @Info(title = "EasyRoadMap API"))
@SpringBootApplication
public class EasyRoadMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(EasyRoadMapApplication.class, args);
    }

}
