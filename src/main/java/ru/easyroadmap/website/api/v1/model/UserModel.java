package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserModel(
        @JsonProperty("email") String email,
        @JsonProperty("name") String name,
        @JsonProperty("photo") PhotoModel photo
) { }
