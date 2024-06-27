package ru.easyroadmap.website.storage.model.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "project_members")
public final class ProjectMember {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "user_email", nullable = false, length = 64)
    private String userEmail;

    @Column(name = "role", length = 32)
    private String role;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public ProjectMember(UUID projectId, String userEmail, String role) {
        this.projectId = projectId;
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
