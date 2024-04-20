package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;

import java.util.UUID;

public record StageModel(
        @JsonProperty("id") long id,
        @JsonProperty("project_id") UUID projectId,
        @JsonProperty("position") int position,
        @JsonProperty("name") String name,
        @JsonProperty("progress") float progress
) {

    public static StageModel fromStage(RoadmapStage stage, float progress) {
        return new StageModel(
                stage.getId(),
                stage.getProjectId(),
                stage.getPosition(),
                stage.getName(),
                progress
        );
    }

}
