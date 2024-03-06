package ru.easyroadmap.website.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.MultiValueMap;
import ru.easyroadmap.website.validation.ValidEmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class RecoveryConfirmationDto {

    @NotNull @NotBlank @Size(min = 6, max = 128)
    @ValidEmailPattern
    private String email;

    @NotNull @NotBlank @Size(min = 6, max = 6)
    private String code;

    public static RecoveryConfirmationDto fromFormData(MultiValueMap<String, String> formData) {
        return new RecoveryConfirmationDto(
                formData.getFirst("email"),
                formData.getFirst("code")
        );
    }

}
