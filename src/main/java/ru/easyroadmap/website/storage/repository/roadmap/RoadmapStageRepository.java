package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;

import java.util.Optional;
import java.util.UUID;

public interface RoadmapStageRepository extends PagingAndSortingRepository<RoadmapStage, Long>, JpaRepository<RoadmapStage, Long> {

    int countAllByProjectIdEquals(UUID projectId);

    @Query("select s.position from RoadmapStage s where s.id = ?1")
    Optional<Byte> getStagePosition(long stageId);

    @Query("select s.projectId from RoadmapStage s where s.id = ?1")
    Optional<UUID> getStageProjectId(long stageId);

    Page<RoadmapStage> findAllByProjectIdEquals(UUID projectId, Pageable pageable);

    @Modifying
    @Query("update RoadmapStage s set s.position = s.position + 1, s.updatedAt = current timestamp where s.projectId = ?1 and s.position >= ?3 and s.position < ?2")
    void updatePositionsBefore(UUID projectId, byte current, byte target);

    @Modifying
    @Query("update RoadmapStage s set s.position = s.position - 1, s.updatedAt = current timestamp where s.projectId = ?1 and s.position > ?2 and s.position <= ?3")
    void updatePositionsAfter(UUID projectId, byte current, byte target);

    @Modifying
    @Query("update RoadmapStage s set s.position = s.position - 1, s.updatedAt = current timestamp where s.projectId = ?1 and s.position > ?2")
    void decrementPositionsAfter(UUID projectId, byte position);

}
