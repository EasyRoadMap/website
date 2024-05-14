package ru.easyroadmap.website.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${server.host}")
    private String serverHost;

    @Bean
    public OpenApiCustomizer openApiCustomizer() {
        return openApi -> openApi
                .info(new Info().title("EasyRoadMap API"))
                .addTagsItem(new Tag().name("auth-api").description("Authentication Service API"))
                .addTagsItem(new Tag().name("public-api").description("Public RESTful API"))
                .addTagsItem(new Tag().name("project-api").description("Projects RESTful API"))
                .addTagsItem(new Tag().name("roadmap-api").description("Roadmaps RESTful API"))
                .addTagsItem(new Tag().name("workspace-api").description("Workspaces RESTful API"))
                .addTagsItem(new Tag().name("user-api").description("Users RESTful API"))
                .servers(List.of(new Server().description("EasyRoadMap").url(serverHost)));
    }

}
