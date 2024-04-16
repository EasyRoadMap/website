package ru.easyroadmap.website.api.v1.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PutUserProfileDto {

    @NotBlank @Size(min = 1, max = 64)
    private String name;

}
