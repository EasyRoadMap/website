package ru.easyroadmap.website.storage.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "photos")
public final class Photo {

    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "width", nullable = false)
    private int width;

    @Column(name = "height", nullable = false)
    private int height;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public Photo(UUID id, int width, int height) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

}
