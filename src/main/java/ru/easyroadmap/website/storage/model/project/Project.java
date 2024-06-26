package ru.easyroadmap.website.storage.model.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.function.Supplier;

@Getter
@NoArgsConstructor
@Entity @Table(name = "projects")
public final class Project {

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "workspace_id", nullable = false)
    private UUID workspaceId;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "description", length = 320)
    private String description;

    @Column(name = "deadline_at")
    @Temporal(TemporalType.DATE)
    private LocalDate deadlineAt;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public Project(UUID workspaceId, String name, String description, LocalDate deadlineAt) {
        this.workspaceId = workspaceId;
        this.name = name;
        this.description = description;
        this.deadlineAt = deadlineAt;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public ProjectInfoModel createInfoModel(Supplier<LocalDate> tasksBasedDeadlineSupplier) {
        return new ProjectInfoModel(name, description, getDeadlineAtOr(tasksBasedDeadlineSupplier));
    }

    public LocalDate getDeadlineAtOr(Supplier<LocalDate> tasksBasedDeadlineSupplier) {
        return deadlineAt != null || tasksBasedDeadlineSupplier == null ? deadlineAt : tasksBasedDeadlineSupplier.get();
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public void setDeadlineAt(LocalDate deadlineAt) {
        this.deadlineAt = deadlineAt;
        this.updatedAt = LocalDateTime.now();
    }

}
