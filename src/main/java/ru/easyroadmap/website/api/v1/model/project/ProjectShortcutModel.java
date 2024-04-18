package ru.easyroadmap.website.api.v1.model.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.storage.model.project.Project;

import java.util.List;
import java.util.UUID;

public record ProjectShortcutModel(
        @JsonProperty("id") UUID uuid,
        @JsonProperty("workspace_id") UUID workspaceId,
        @JsonProperty("name") String name,
        @JsonProperty("photo") @JsonInclude(JsonInclude.Include.NON_NULL) PhotoModel photo,
        @JsonProperty("total_member_count") int totalMemberCount,
        @JsonProperty("member_photo_ids") List<UUID> memberPhotoIds,
        @JsonProperty("member_photos") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<PhotoModel> memberPhotos
) {

    public static ProjectShortcutModel fromProject(
            Project project,
            PhotoModel photo,
            int totalMemberCount,
            List<UUID> memberPhotoIds,
            List<PhotoModel> memberPhotos
    ) {
        return new ProjectShortcutModel(
                project.getId(),
                project.getWorkspaceId(),
                project.getName(),
                photo,
                totalMemberCount,
                memberPhotoIds,
                memberPhotos
        );
    }

}
