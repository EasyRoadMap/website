package ru.easyroadmap.website.storage.model.roadmap;


import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "roadmap_task_attachments")
public class RoadmapTaskAttachment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "task_id", nullable = false)
    private long taskId;

    @Column(name = "type", nullable = false)
    private byte type;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "md5", nullable = false)
    private String md5;

    @Column(name = "size", nullable = false)
    private long size;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public RoadmapTaskAttachment(long taskId, byte type, String fileName, String md5, long size) {
        this.taskId = taskId;
        this.type = type;
        this.fileName = fileName;
        this.md5 = md5;
        this.size = size;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    @Getter
    @AllArgsConstructor
    public enum Type {

        DEFAULT ((byte) 0, "default"),
        ARCHIVE ((byte) 1, "archive"),
        IMAGE   ((byte) 2, "image"),
        ;

        private final byte id;
        @JsonValue
        private final String key;

    }

}
