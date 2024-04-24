package ru.easyroadmap.website.storage.model.roadmap;


import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "roadmap_task_attachments")
public class RoadmapTaskAttachment {

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "task_id", nullable = false)
    private long taskId;

    @Column(name = "type", nullable = false)
    private byte type;

    @Column(name = "mime_type", nullable = false)
    private String mimeType;

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

    public RoadmapTaskAttachment(long taskId, byte type, String mimeType, String md5, long size) {
        this.taskId = taskId;
        this.type = type;
        this.mimeType = mimeType;
        this.md5 = md5;
        this.size = size;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public Type getType() {
        for (Type constant : Type.values())
            if (constant.getId() == type)
                return constant;

        throw new IllegalStateException("There is no Type enum constant with ID #%d!".formatted(type));
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

        public static Type fromMimeType(String mimeType) {
            if (mimeType != null && !mimeType.isBlank()) {
                try {
                    MediaType mediaType = MediaType.parseMediaType(mimeType);

                    if ("image".equalsIgnoreCase(mediaType.getType()))
                        return IMAGE;

                    if ("application".equalsIgnoreCase(mediaType.getType())) {
                        String subtype = mediaType.getSubtype();
                        if (subtype != null && !subtype.isBlank() && ARCHIVE_MIME_SUBTYPES.contains(subtype.toLowerCase())) {
                            return ARCHIVE;
                        }
                    }
                } catch (InvalidMediaTypeException ignored) {
                }
            }

            return DEFAULT;
        }

        private static final List<String> ARCHIVE_MIME_SUBTYPES = List.of(
                "x-bzip", "x-bzip2", "gzip", "java-archive", "vnd.rar", "x-tar", "zip", "x-7z-compressed"
        );

    }

}
