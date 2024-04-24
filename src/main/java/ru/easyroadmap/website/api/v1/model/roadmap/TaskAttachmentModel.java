package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment.Type;

import java.util.UUID;

public record TaskAttachmentModel(
        @JsonProperty("id") UUID id,
        @JsonProperty("type") Type type,
        @JsonProperty("md5") String md5,
        @JsonProperty("size") long size,
        @JsonProperty("url") String url
) {

    public static TaskAttachmentModel fromAttachment(String urlBase, RoadmapTaskAttachment attachment) {
        String url = "%s/erm-web/a/%s".formatted(urlBase, attachment.getId());
        return new TaskAttachmentModel(attachment.getId(), attachment.getType(), attachment.getMd5(), attachment.getSize(), url);
    }

}
