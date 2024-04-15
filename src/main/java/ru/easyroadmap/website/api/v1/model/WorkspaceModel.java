package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public record WorkspaceModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("name") String name,
        @JsonProperty("description") String description,
        @JsonProperty("photo") PhotoModel photo
) { }
