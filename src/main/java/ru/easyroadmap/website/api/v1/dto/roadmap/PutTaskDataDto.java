package ru.easyroadmap.website.api.v1.dto.roadmap;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class PutTaskDataDto {

    @NotNull @Min(0) @Max(2)
    private byte status;

    @NotNull @Size(min = 2, max = 80)
    private String name;

    @Size(max = 320)
    private String description;

    @FutureOrPresent
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate deadlineAt;

}
