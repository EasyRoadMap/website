package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspace_members")
public final class WorkspaceMember {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "workspace_id", nullable = false)
    private String workspaceId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public WorkspaceMember(String workspaceId, String userEmail, Role role) {
        this.workspaceId = workspaceId;
        this.userEmail = userEmail;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public void setRole(Role role) {
        this.role = role;
        this.updatedAt = LocalDateTime.now();
    }

    public enum Role {
        ADMIN, MEMBER
    }

}
