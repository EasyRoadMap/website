package ru.easyroadmap.website.storage.model.roadmap;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "roadmap_task_attachments")
public class RoadmapTaskAttachment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "task_id", nullable = false)
    private long taskId;

    @Column(name = "attachment_id", nullable = false)
    private UUID attachmentId;

    public RoadmapTaskAttachment(long taskId, UUID attachmentId) {
        this.taskId = taskId;
        this.attachmentId = attachmentId;
    }

}
