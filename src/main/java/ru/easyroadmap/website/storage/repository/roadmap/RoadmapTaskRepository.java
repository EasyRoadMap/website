package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;

import java.util.Optional;
import java.util.UUID;

public interface RoadmapTaskRepository extends PagingAndSortingRepository<RoadmapTask, Long>, JpaRepository<RoadmapTask, Long> {

    int countAllByStageIdEquals(long stageId);

    @Query("select count(t) from RoadmapTask t where t.stageId = ?1 and t.status != 1")
    int countNotPlannedStageTasks(long stageId);

    @Query("select s.projectId from RoadmapTask t inner join RoadmapStage s on t.stageId = s.id where t.id = ?1")
    Optional<UUID> getTaskProjectId(long taskId);

    Page<RoadmapTask> findAllByStageIdEquals(long stageId, Pageable pageable);

}
