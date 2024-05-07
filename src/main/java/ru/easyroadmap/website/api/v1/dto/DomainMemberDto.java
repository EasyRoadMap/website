package ru.easyroadmap.website.api.v1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.ValidEmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class DomainMemberDto {

    @NotBlank @Size(min = 6, max = 64)
    @ValidEmailPattern
    private String email;

    @Size(min = 1, max = 32)
    private String role;

}
