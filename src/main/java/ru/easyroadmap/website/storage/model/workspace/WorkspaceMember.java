package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspace_members")
public final class WorkspaceMember {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "workspace_id", nullable = false)
    private UUID workspaceId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "role")
    private String role;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public WorkspaceMember(UUID workspaceId, String userEmail, String role) {
        this.workspaceId = workspaceId;
        this.userEmail = userEmail;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public void setRole(String role) {
        this.role = role;
        this.updatedAt = LocalDateTime.now();
    }

}
