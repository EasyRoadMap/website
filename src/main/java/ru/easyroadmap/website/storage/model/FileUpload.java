package ru.easyroadmap.website.storage.model;


import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskAttachmentModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "file_uploads")
public class FileUpload {

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "type", nullable = false)
    private byte type;

    @Column(name = "file_name", nullable = false)
    private String fileName;

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

    public FileUpload(byte type, String fileName, String mimeType, String md5, long size) {
        this.type = type;
        this.fileName = fileName;
        this.mimeType = mimeType;
        this.md5 = md5;
        this.size = size;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public TaskAttachmentModel createTaskAttachmentModel(String urlBase) {
        String url = "%s/erm-web/u/%s".formatted(urlBase, id);
        return new TaskAttachmentModel(id, getType(), fileName, md5, size, urlBase);
    }

    public FrontTaskAttachmentModel createFrontTaskAttachmentModel(String urlBase) {
        String url = "%s/erm-web/u/%s".formatted(urlBase, id);
        return new FrontTaskAttachmentModel(getType(), fileName, size, urlBase);
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
                "x-bzip", "x-bzip2", "gzip", "java-archive", "vnd.rar", "x-tar", "zip", "x-7z-compressed", "x-zip-compressed"
        );

    }

}
