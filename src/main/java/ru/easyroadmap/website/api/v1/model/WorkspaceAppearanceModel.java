package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;

public record WorkspaceAppearanceModel(
        @JsonProperty("theme") Theme theme,
        @JsonProperty("accent_color") int accentColor
) {

    public static WorkspaceAppearanceModel fromWorkspace(Workspace workspace) {
        return new WorkspaceAppearanceModel(workspace.getTheme(), workspace.getAccentColor());
    }

}
