package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.Photo;

public record PhotoModel(
        @JsonProperty("x") int x,
        @JsonProperty("y") int y,
        @JsonProperty("width") int width,
        @JsonProperty("height") int height,
        @JsonProperty("url") String url
) {

    public static PhotoModel fromPhoto(String urlBase, Photo photo) {
        String url = "%s/erm-web/p/%s".formatted(urlBase, photo.getId());
        return new PhotoModel(photo.getX(), photo.getY(), photo.getWidth(), photo.getHeight(), url);
    }

}
