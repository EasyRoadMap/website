package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;

public record StageModel(
        @JsonProperty("id") long id,
        @JsonProperty("position") int position,
        @JsonProperty("name") @JsonInclude(JsonInclude.Include.NON_NULL) String name,
        @JsonProperty("progress") float progress
) {

    public static StageModel fromStage(RoadmapStage stage) {
        return new StageModel(
                stage.getId(),
                stage.getPosition(),
                stage.getName(),
                stage.getProgress()
        );
    }

}
