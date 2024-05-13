package ru.easyroadmap.website.api.v1.dto.workspace;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.annotation.WorkspaceTheme;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class WorkspaceAppearanceDto {

    @NotEmpty
    @WorkspaceTheme
    private String theme;

    @NotNull
    private Integer accentColor;

}
