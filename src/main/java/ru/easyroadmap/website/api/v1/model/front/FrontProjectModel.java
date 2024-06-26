package ru.easyroadmap.website.api.v1.model.front;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;

import java.util.List;
import java.util.UUID;

public record FrontProjectModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("info") ProjectInfoModel info,
        @JsonProperty("photo") PhotoModel photo,
        @JsonProperty("links") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<LinkModel> links,
        @JsonProperty("stages") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<StageModel> roadmapStages
) {

    public record LinkModel(
            @JsonProperty("name") String name,
            @JsonProperty("url") String url
    ) { }

    public record StageModel(
            @JsonProperty("id") long id,
            @JsonProperty("position") int position,
            @JsonProperty("name") @JsonInclude(JsonInclude.Include.NON_NULL) String name,
            @JsonProperty("progress") float progress,
            @JsonProperty("is_in_progress") Boolean inProgress
    ) { }

}
