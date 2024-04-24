package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;

public record DomainCardModel(
        @JsonProperty("id") UUID id,
        @JsonProperty("name") String name,
        @JsonProperty("photo") PhotoModel photo,
        @JsonProperty("members_count") int membersCount,
        @JsonProperty("member_photos") List<PhotoModel> memberPhotos
) { }
