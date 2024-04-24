package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.Photo;

public record PhotoModel(
        @JsonProperty("width") int width,
        @JsonProperty("height") int height,
        @JsonProperty("url") String url,
        @JsonProperty("default") @JsonInclude(JsonInclude.Include.NON_NULL) Boolean defaultPicture
) {

    public static PhotoModel fromPhoto(String urlBase, Photo photo) {
        String url = "%s/erm-web/p/%s".formatted(urlBase, photo.getId());
        return new PhotoModel(photo.getWidth(), photo.getHeight(), url, null);
    }

}
