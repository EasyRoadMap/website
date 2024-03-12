package ru.easyroadmap.website.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.ValidEmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class EmailConfirmationDto {

    @NotNull @NotBlank @Size(min = 6, max = 64)
    @ValidEmailPattern
    private String email;

    @NotNull @NotBlank @Size(min = 6, max = 6)
    @Pattern(regexp = "\\d{6}", message = "code: malformed")
    private String code;

}
