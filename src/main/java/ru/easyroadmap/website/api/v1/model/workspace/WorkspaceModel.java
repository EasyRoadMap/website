package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.UUID;

public record WorkspaceModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("info") WorkspaceInfoModel info,
        @JsonProperty("appearance") @JsonInclude(JsonInclude.Include.NON_NULL) WorkspaceAppearanceModel appearance,
        @JsonProperty("photo") PhotoModel photo,
        @JsonProperty("is_admin") @JsonInclude(JsonInclude.Include.NON_NULL) Boolean isAdmin
) {

    public static WorkspaceModel fromWorkspace(Workspace workspace, PhotoModel photo, Boolean isAdmin, boolean includeAppearance) {
        return new WorkspaceModel(
                workspace.getId(),
                workspace.createInfoModel(),
                includeAppearance ? workspace.createAppearanceModel() : null,
                photo,
                isAdmin
        );
    }

}
