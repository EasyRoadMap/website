package ru.easyroadmap.website.api.v1.model.workspace;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record WorkspaceInvitationModel(
        @JsonProperty("id") UUID id,
        @JsonProperty("inviter") Inviter inviter,
        @JsonProperty("workspace") WorkspaceCard card,
        @JsonProperty("expires_at") @JsonFormat(pattern = "yyyy-MM-dd") LocalDateTime expiresAt
) {

    public static WorkspaceInvitationModel fromInvitation(
            WorkspaceInvitation invitation,
            String inviterName,
            Workspace workspace,
            PhotoModel workspacePhoto,
            int membersCount,
            List<PhotoModel> memberPhotos
    ) {
        return new WorkspaceInvitationModel(
                invitation.getId(),
                new Inviter(inviterName),
                new WorkspaceCard(workspace.getId(), workspace.getName(), workspacePhoto, membersCount, memberPhotos),
                invitation.getExpiresAt()
        );
    }

    public record Inviter(
            @JsonProperty("name") String name
    ) { }

    public record WorkspaceCard(
            @JsonProperty("id") UUID id,
            @JsonProperty("name") String name,
            @JsonProperty("photo") PhotoModel photo,
            @JsonProperty("members_count") int membersCount,
            @JsonProperty("member_photos") List<PhotoModel> memberPhotos
    ) { }

}
