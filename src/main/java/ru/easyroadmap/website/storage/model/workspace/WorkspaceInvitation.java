package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspace_invitations")
public final class WorkspaceInvitation {

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "workspace_id", nullable = false)
    private UUID workspaceId;

    @Column(name = "inviter_user_email", nullable = false, length = 64)
    private String inviterUserEmail;

    @Column(name = "invited_user_email", nullable = false, length = 64)
    private String invitedUserEmail;

    @Column(name = "role", length = 32)
    private String role;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Column(name = "expires_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    public WorkspaceInvitation(UUID workspaceId, String inviterUserEmail, String invitedUserEmail, String role) {
        this.workspaceId = workspaceId;
        this.inviterUserEmail = inviterUserEmail;
        this.invitedUserEmail = invitedUserEmail;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
        this.expiresAt = createdAt.plusDays(1);
    }

    public boolean isExpired() {
        return expiresAt.isBefore(LocalDateTime.now());
    }

    public void renew(String inviterUserEmail, String role) {
        this.inviterUserEmail = inviterUserEmail;
        this.role = role;
        this.updatedAt = LocalDateTime.now();
        this.expiresAt = updatedAt.plusDays(1);
    }

}
