package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public record StageModel(
        @JsonProperty("id") long id,
        @JsonProperty("position") int position,
        @JsonProperty("name") @JsonInclude(JsonInclude.Include.NON_NULL) String name,
        @JsonProperty("progress") float progress,
        @JsonProperty("is_in_progress") Boolean inProgress
) { }
