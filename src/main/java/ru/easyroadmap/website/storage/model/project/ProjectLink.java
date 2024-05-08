package ru.easyroadmap.website.storage.model.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.easyroadmap.website.api.v1.model.front.FrontProjectModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectLinkModel;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "project_links")
public final class ProjectLink {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public ProjectLink(UUID projectId, String name, String url) {
        this.projectId = projectId;
        this.name = name;
        this.url = url;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public ProjectLinkModel createModel() {
        return new ProjectLinkModel(name, url);
    }

    public FrontProjectModel.LinkModel createFrontModel() {
        return new FrontProjectModel.LinkModel(name, url);
    }

    public void update(String name, String url) {
        this.name = name;
        this.url = url;
        this.updatedAt = LocalDateTime.now();
    }

}
