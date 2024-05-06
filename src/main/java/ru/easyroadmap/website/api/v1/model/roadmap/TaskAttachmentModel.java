package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.FileUpload.Type;

import java.util.UUID;

public record TaskAttachmentModel(
        @JsonProperty("id") UUID id,
        @JsonProperty("type") Type type,
        @JsonProperty("file_name") String fileName,
        @JsonProperty("md5") String md5,
        @JsonProperty("size") long size,
        @JsonProperty("url") String url
) { }
