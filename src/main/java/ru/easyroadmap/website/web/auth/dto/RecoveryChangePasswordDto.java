package ru.easyroadmap.website.web.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.annotation.EmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class RecoveryChangePasswordDto {

    @NotBlank @Size(min = 6, max = 64)
    @EmailPattern
    private String email;

    @NotBlank @Size(min = 8, max = 128)
    private String password;

}
