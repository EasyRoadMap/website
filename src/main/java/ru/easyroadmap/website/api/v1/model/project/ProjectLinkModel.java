package ru.easyroadmap.website.api.v1.model.project;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.project.ProjectLink;

import java.util.List;

public record ProjectLinkModel(
        @JsonProperty("name") String name,
        @JsonProperty("url") String url
) {

    public static ProjectLinkModel fromLink(ProjectLink link) {
        return new ProjectLinkModel(
                link.getName(),
                link.getUrl()
        );
    }

    public static List<ProjectLinkModel> fromLinks(List<ProjectLink> links) {
        return links != null && !links.isEmpty()
                ? links.stream().map(ProjectLinkModel::fromLink).toList()
                : null;
    }

}
