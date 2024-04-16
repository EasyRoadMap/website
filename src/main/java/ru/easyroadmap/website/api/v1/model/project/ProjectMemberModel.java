package ru.easyroadmap.website.api.v1.model.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.storage.model.project.ProjectMember;

public record ProjectMemberModel(
        @JsonProperty("user") UserModel user,
        @JsonProperty("role") @JsonInclude(JsonInclude.Include.NON_NULL) String role
) {

    public static ProjectMemberModel fromProjectMember(ProjectMember member, UserModel user) {
        return new ProjectMemberModel(
                user,
                member.getRole()
        );
    }

}
