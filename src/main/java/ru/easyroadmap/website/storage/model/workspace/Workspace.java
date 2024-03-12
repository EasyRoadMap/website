package ru.easyroadmap.website.storage.model.workspace;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspaces")
public final class Workspace {

    public static final int DEFAULT_ACCENT_COLOR = -16751105; // 'blue' accent color

    @Id
    @Column(name = "id", nullable = false)
    private String workspaceId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "theme", nullable = false)
    @Enumerated(EnumType.STRING)
    private Theme theme;

    @Column(name = "accent_color", nullable = false)
    private int accentColor;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    public Workspace(String workspaceId, String name, String description, Theme theme, int accentColor) {
        this.workspaceId = workspaceId;
        this.name = name;
        this.description = description;
        this.theme = theme;
        this.accentColor = accentColor;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAccentColor(int accentColor) {
        this.accentColor = accentColor;
        this.updatedAt = LocalDateTime.now();
    }

    public enum Theme {
        LIGHT, DARK
    }

}
