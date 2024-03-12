package ru.easyroadmap.website.web.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.ValidEmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class SignInDto {

    @NotNull @NotBlank @Size(min = 6, max = 64)
    @ValidEmailPattern
    private String email;

    @NotNull @NotBlank @Size(min = 8, max = 128)
    private String password;

}
