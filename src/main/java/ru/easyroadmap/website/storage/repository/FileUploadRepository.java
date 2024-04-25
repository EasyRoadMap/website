package ru.easyroadmap.website.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.FileUpload;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FileUploadRepository extends JpaRepository<FileUpload, UUID> {

    @Query("select u from FileUpload u inner join RoadmapTaskAttachment a on u.id = a.attachmentId where a.taskId = ?1")
    List<FileUpload> findAllTaskAttachments(long taskId);

    @Query("select u from FileUpload u inner join RoadmapTaskAttachment a on u.id = a.attachmentId where u.id = ?1")
    Optional<FileUpload> findTaskAttachment(UUID uploadId);

    @Query("select 1 from FileUpload u inner join RoadmapTaskAttachment a on u.id = a.attachmentId where u.id = ?1")
    boolean isTaskAttachmentExist(UUID uploadId);

}
