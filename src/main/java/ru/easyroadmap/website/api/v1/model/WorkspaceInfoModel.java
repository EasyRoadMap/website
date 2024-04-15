package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

public record WorkspaceInfoModel(
        @JsonProperty("name") String name,
        @JsonProperty("description") @JsonInclude(JsonInclude.Include.NON_NULL) String description
) {

    public static WorkspaceInfoModel fromWorkspace(Workspace workspace) {
        return new WorkspaceInfoModel(workspace.getName(), workspace.getDescription());
    }

}
