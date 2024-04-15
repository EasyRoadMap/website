package ru.easyroadmap.website.api.v1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateWorkspaceDto {

    @NotBlank @Size(min = 2, max = 64)
    private String name;

    @Size(min = 2, max = 320)
    private String description;

}
