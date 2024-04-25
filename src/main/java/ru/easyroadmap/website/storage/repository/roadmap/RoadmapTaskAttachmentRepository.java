package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapTaskAttachmentRepository extends JpaRepository<RoadmapTaskAttachment, Long> {

    void deleteAllByTaskIdEquals(long taskId);

    boolean existsByTaskIdEqualsAndAttachmentIdEquals(long taskId, UUID uploadId);

    @Query("select u.id from FileUpload u inner join RoadmapTaskAttachment a on u.id = a.attachmentId where a.taskId = ?1")
    List<UUID> findAllAttachmentIds(long taskId);

    Optional<RoadmapTaskAttachment> findByAttachmentIdEquals(UUID uploadId);

    @Query("select u.id from FileUpload u inner join RoadmapTaskAttachment a on u.id = a.attachmentId where a.taskId = ?1 and u.id not in ?2")
    List<UUID> findUnusedAttachmentIds(long taskId, UUID[] usedUploadIds);

}
