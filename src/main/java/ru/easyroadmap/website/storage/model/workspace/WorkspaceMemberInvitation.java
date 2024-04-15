package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspace_member_invitations")
public final class WorkspaceMemberInvitation {

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "workspace_id", nullable = false)
    private UUID workspaceId;

    @Column(name = "inviter_user_email", nullable = false)
    private String inviterUserEmail;

    @Column(name = "invited_user_email", nullable = false)
    private String invitedUserEmail;

    @Column(name = "role")
    private String role;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    public WorkspaceMemberInvitation(UUID workspaceId, String inviterUserEmail, String invitedUserEmail, String role) {
        this.workspaceId = workspaceId;
        this.inviterUserEmail = inviterUserEmail;
        this.invitedUserEmail = invitedUserEmail;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = createdAt.plusDays(1);
    }

}
