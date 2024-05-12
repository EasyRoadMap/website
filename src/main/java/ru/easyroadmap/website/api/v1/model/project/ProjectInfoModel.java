package ru.easyroadmap.website.api.v1.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.project.Project;

import java.time.LocalDate;

public record ProjectInfoModel(
        @JsonProperty("name") String name,
        @JsonProperty("description") @JsonInclude(JsonInclude.Include.NON_NULL) String description,
        @JsonProperty("deadline_at") @JsonFormat(pattern = "yyyy-MM-dd") @JsonInclude(JsonInclude.Include.NON_NULL) LocalDate deadlineAt
) {

    public static ProjectInfoModel fromProject(Project project, LocalDate deadlineAt) {
        return new ProjectInfoModel(
                project.getName(),
                project.getDescription(),
                deadlineAt
        );
    }

}
