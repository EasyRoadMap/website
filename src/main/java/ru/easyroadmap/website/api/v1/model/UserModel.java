package ru.easyroadmap.website.api.v1.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.User;

public record UserModel(
        @JsonProperty("email") String email,
        @JsonProperty("name") String name,
        @JsonProperty("photo") @JsonInclude(JsonInclude.Include.NON_NULL) PhotoModel photo
) {

    public static UserModel fromUser(User user, PhotoModel photo, boolean includeEmail) {
        return new UserModel(
                includeEmail ? user.getEmail() : null,
                user.getName(),
                photo
        );
    }

}
