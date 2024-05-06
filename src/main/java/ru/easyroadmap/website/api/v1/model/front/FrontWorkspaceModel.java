package ru.easyroadmap.website.api.v1.model.front;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceAppearanceModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceInfoModel;

import java.util.List;
import java.util.UUID;

public record FrontWorkspaceModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("info") WorkspaceInfoModel info,
        @JsonProperty("appearance") @JsonInclude(JsonInclude.Include.NON_NULL) WorkspaceAppearanceModel appearance,
        @JsonProperty("photo") PhotoModel photo,
        @JsonProperty("projects") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<ProjectModel> projects
) {

    public record ProjectModel(
            @JsonProperty("id") UUID uuid,
            @JsonProperty("info") ProjectInfoModel info,
            @JsonProperty("photo") PhotoModel photo
    ) {}

}
