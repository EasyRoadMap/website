package ru.easyroadmap.website.api.v1.dto.project;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class ProjectDataDto {

    @NotBlank @Size(min = 2, max = 64)
    private String name;

    @Size(min = 2, max = 320)
    private String description;

    @FutureOrPresent
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate deadlineAt;

}
