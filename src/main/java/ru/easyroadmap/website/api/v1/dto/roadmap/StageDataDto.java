package ru.easyroadmap.website.api.v1.dto.roadmap;

import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class StageDataDto {

    @Size(min = 2, max = 32)
    private String name;

}
