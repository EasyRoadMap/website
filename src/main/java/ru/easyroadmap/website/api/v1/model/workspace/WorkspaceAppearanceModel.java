package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;

public record WorkspaceAppearanceModel(
        @JsonProperty("theme") Theme theme,
        @JsonProperty("accent_color") int accentColor
) { }
