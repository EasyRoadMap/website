package ru.easyroadmap.website.storage.model.roadmap;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "roadmap_stages")
public final class RoadmapStage {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "position", nullable = false)
    private byte position;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public RoadmapStage(UUID projectId, byte position, String name) {
        this.projectId = projectId;
        this.position = position;
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public void setPosition(byte position) {
        this.position = position;
        this.updatedAt = LocalDateTime.now();
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

}
