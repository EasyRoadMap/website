package ru.easyroadmap.website.api.v1.dto.roadmap;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class MoveStageDto {

    @NotNull @Min(1)
    private long stageId;

    @NotNull @Min(0)
    private byte position;

}
