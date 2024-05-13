package ru.easyroadmap.website.api.v1.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.easyroadmap.website.validation.annotation.ElementSize;
import ru.easyroadmap.website.validation.annotation.EmailPattern;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class UserIdentifierMultiDto {

    @NotEmpty @ElementSize(min = 6, max = 64)
    @EmailPattern
    private String[] email;

}
