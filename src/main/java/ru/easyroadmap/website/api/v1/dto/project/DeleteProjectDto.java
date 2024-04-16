package ru.easyroadmap.website.api.v1.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class DeleteProjectDto {

    @NotBlank @Size(min = 8, max = 128)
    private String password;

}
