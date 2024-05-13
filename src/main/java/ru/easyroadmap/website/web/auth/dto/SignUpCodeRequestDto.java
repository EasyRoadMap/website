package ru.easyroadmap.website.web.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.annotation.EmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class SignUpCodeRequestDto {

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotBlank @Size(min = 6, max = 64)
    @EmailPattern
    private String email;

    @Schema(description = "Optional flag 'renew' to renew an email confirmation after one minute", example = "true / false")
    private String renew;

    public boolean isRenew() {
        return "true".equalsIgnoreCase(renew);
    }

}
