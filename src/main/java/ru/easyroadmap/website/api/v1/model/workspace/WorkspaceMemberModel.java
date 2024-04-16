package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

public record WorkspaceMemberModel(
        @JsonProperty("user") UserModel user,
        @JsonProperty("role") @JsonInclude(JsonInclude.Include.NON_NULL) String role,
        @JsonProperty("is_admin") @JsonInclude(JsonInclude.Include.NON_NULL) Boolean isAdmin
) {

    public static WorkspaceMemberModel fromWorkspaceMember(WorkspaceMember member, UserModel user, Boolean isAdmin) {
        return new WorkspaceMemberModel(
                user,
                member.getRole(),
                isAdmin
        );
    }

}
