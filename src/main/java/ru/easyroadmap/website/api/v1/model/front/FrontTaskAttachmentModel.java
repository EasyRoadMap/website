package ru.easyroadmap.website.api.v1.model.front;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.FileUpload;

public record FrontTaskAttachmentModel(
        @JsonProperty("type") FileUpload.Type type,
        @JsonProperty("file_name") String fileName,
        @JsonProperty("size") long size,
        @JsonProperty("url") String url
) { }
