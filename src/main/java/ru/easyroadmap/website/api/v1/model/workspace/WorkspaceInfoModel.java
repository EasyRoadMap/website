package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public record WorkspaceInfoModel(
        @JsonProperty("name") String name,
        @JsonProperty("description") @JsonInclude(JsonInclude.Include.NON_NULL) String description
) { }
