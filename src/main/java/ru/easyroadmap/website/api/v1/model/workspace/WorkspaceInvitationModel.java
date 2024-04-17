package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;

import java.time.LocalDateTime;

public record WorkspaceInvitationModel(
        @JsonProperty("inviter") UserModel inviter,
        @JsonProperty("workspace") WorkspaceModel workspace,
        @JsonProperty("expires_at") LocalDateTime expiresAt
) {

    public static WorkspaceInvitationModel fromInvitation(WorkspaceInvitation invitation, UserModel inviter, WorkspaceModel workspace) {
        return new WorkspaceInvitationModel(
                inviter,
                workspace,
                invitation.getExpiresAt()
        );
    }

}
