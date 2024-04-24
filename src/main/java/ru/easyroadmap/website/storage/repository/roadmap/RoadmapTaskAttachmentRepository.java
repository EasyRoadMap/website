package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;

import java.util.List;
import java.util.UUID;

public interface RoadmapTaskAttachmentRepository extends JpaRepository<RoadmapTaskAttachment, UUID> {

    int countAllByTaskIdEquals(long taskId);

    void deleteAllByTaskIdEquals(long taskId);

    @Modifying
    @Query("delete from RoadmapTaskAttachment a where a.taskId = ?1 and a.id not in ?2")
    void deleteUnusedAttachments(long taskId, UUID[] usedIds);

    List<RoadmapTaskAttachment> findAllByTaskIdEquals(long taskId);

    @Query("select a.id from RoadmapTaskAttachment a where a.taskId = ?1")
    List<UUID> findAllAttachmentIds(long taskId);

    @Query("select a.id from RoadmapTaskAttachment a where a.taskId = ?1 and a.id not in ?2")
    List<UUID> findUnusedAttachmentIds(long taskId, UUID[] usedIds);

}
