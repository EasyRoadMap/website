package ru.easyroadmap.website.storage.model.roadmap;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity @Table(name = "roadmap_tasks")
public final class RoadmapTask {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "stage_id", nullable = false)
    private long stageId;

    @Column(name = "status", nullable = false)
    private byte status;

    @Column(name = "name", nullable = false, length = 80)
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

    public RoadmapTask(long stageId, byte status, String name, String description, LocalDate deadlineAt) {
        this.stageId = stageId;
        this.status = status;
        this.name = name;
        this.description = description;
        this.deadlineAt = deadlineAt;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public TaskModel createModel(List<TaskAttachmentModel> attachments) {
        return new TaskModel(id, getStatus(), name, description, deadlineAt, attachments);
    }

    public FrontTaskModel createFrontModel(List<FrontTaskAttachmentModel> attachments) {
        return new FrontTaskModel(getStatus(), name, description, deadlineAt, attachments);
    }

    public Status getStatus() {
        for (Status constant : Status.values())
            if (constant.getId() == status)
                return constant;

        throw new IllegalStateException("There is no Status enum constant with ID #%d!".formatted(status));
    }

    public void setStatus(byte status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
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

    @Getter
    @AllArgsConstructor
    public enum Status {

        IN_PROGRESS ((byte) 0, "in_progress"),
        PLANNED     ((byte) 1, "planned"),
        DONE        ((byte) 2, "done"),
        ;

        private final byte id;
        @JsonValue
        private final String key;

    }

}
