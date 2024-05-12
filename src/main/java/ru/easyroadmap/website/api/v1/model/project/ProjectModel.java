package ru.easyroadmap.website.api.v1.model.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;

public record ProjectModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("workspace_id") UUID workspaceId,
        @JsonProperty("info") ProjectInfoModel info,
        @JsonProperty("photo") PhotoModel photo,
        @JsonProperty("links") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<ProjectLinkModel> links
) {

    public static ProjectModel fromProject(Project project, PhotoModel photo, List<ProjectLink> links, Supplier<LocalDate> tasksBasedDeadlineSupplier) {
        return new ProjectModel(
                project.getId(),
                project.getWorkspaceId(),
                project.createInfoModel(tasksBasedDeadlineSupplier),
                photo,
                ProjectLinkModel.fromLinks(links)
        );
    }

}
