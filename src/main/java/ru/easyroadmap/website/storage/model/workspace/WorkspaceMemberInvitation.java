package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspace_member_invitations")
public final class WorkspaceMemberInvitation {

    @Id
    @Column(name = "id", nullable = false)
    private String inviteKey;

    @Column(name = "workspace_id", nullable = false)
    private String workspaceId;

    @Column(name = "inviter_user_email", nullable = false)
    private String inviterUserEmail;

    @Column(name = "invited_user_email", nullable = false)
    private String invitedUserEmail;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    public WorkspaceMemberInvitation(String inviteKey, String workspaceId, String inviterUserEmail, String invitedUserEmail) {
        this.inviteKey = inviteKey;
        this.workspaceId = workspaceId;
        this.inviterUserEmail = inviterUserEmail;
        this.invitedUserEmail = invitedUserEmail;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = createdAt.plusDays(1);
    }

}
