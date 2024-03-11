package ru.easyroadmap.website.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.ValidEmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class SignUpDto {

    @NotNull @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotNull @NotBlank @Size(min = 6, max = 128)
    @ValidEmailPattern
    private String email;

    @NotNull @NotBlank @Size(min = 8, max = 128)
    private String password;

}
