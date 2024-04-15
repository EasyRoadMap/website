package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProjectLinkModel(
        @JsonProperty("name") String name,
        @JsonProperty("url") String url
) { }
