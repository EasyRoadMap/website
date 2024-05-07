package ru.easyroadmap.website.storage.model.roadmap;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.easyroadmap.website.api.v1.model.front.FrontProjectModel;
import ru.easyroadmap.website.api.v1.model.roadmap.StageModel;

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

    @Column(name = "name")
    private String name;

    @Column(name = "progress", nullable = false)
    private float progress;

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
        this.progress = 0F;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public StageModel createModel() {
        return new StageModel(id, position, name, progress, null);
    }

    public StageModel createModel(boolean inProgress) {
        return new StageModel(id, position, name, progress, inProgress);
    }

    public FrontProjectModel.StageModel createFrontModel() {
        return new FrontProjectModel.StageModel(id, position, name, progress, null);
    }

    public FrontProjectModel.StageModel createFrontModel(boolean inProgress) {
        return new FrontProjectModel.StageModel(id, position, name, progress, inProgress);
    }

    public void setPosition(byte position) {
        this.position = position;
        this.updatedAt = LocalDateTime.now();
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void setProgress(float progress) {
        this.progress = progress;
        this.updatedAt = LocalDateTime.now();
    }

}
