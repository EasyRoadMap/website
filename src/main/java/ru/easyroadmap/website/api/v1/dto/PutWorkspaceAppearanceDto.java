package ru.easyroadmap.website.api.v1.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.ValidWorkspaceTheme;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PutWorkspaceAppearanceDto {

    @NotEmpty
    @ValidWorkspaceTheme
    private String theme;

    @NotNull
    private Integer accentColor;

}
