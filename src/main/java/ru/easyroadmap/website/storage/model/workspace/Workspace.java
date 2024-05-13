package ru.easyroadmap.website.storage.model.workspace;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceAppearanceModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceInfoModel;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@Entity @Table(name = "workspaces")
public final class Workspace {

    public static final int DEFAULT_ACCENT_COLOR = -16751105; // 'blue' accent color

    @Id @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "admin_id", nullable = false)
    private String adminId;

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

    public Workspace(String name, String description, String adminId, Theme theme, int accentColor) {
        this.name = name;
        this.description = description;
        this.adminId = adminId;
        this.theme = theme;
        this.accentColor = accentColor;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = createdAt;
    }

    public WorkspaceInfoModel createInfoModel() {
        return new WorkspaceInfoModel(name, description);
    }

    public WorkspaceAppearanceModel createAppearanceModel() {
        return new WorkspaceAppearanceModel(theme, accentColor);
    }

    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
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

    @Getter
    @AllArgsConstructor
    public enum Theme {

        LIGHT("light"),
        DARK("dark"),
        SYSTEM("system"),
        ;

        @JsonValue
        private final String key;

    }

}
