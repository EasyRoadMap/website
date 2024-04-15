package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PhotoModel(
        @JsonProperty("x") int x,
        @JsonProperty("y") int y,
        @JsonProperty("width") int width,
        @JsonProperty("height") int height,
        @JsonProperty("url") String url
) { }
