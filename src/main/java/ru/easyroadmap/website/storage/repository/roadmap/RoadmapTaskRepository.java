package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapTaskRepository extends PagingAndSortingRepository<RoadmapTask, Long>, JpaRepository<RoadmapTask, Long> {

    int countAllByStageIdEquals(long stageId);

    @Query("select count(t) from RoadmapTask t where t.stageId = ?1 and t.status = 2")
    int countNotPlannedStageTasks(long stageId);

    void deleteAllByStageIdIn(List<Long> stageIds);

    void deleteAllByStageIdEquals(long stageId);

    @Query("select t.id from RoadmapTask t where t.stageId = ?1")
    List<Long> getAllTasksInStage(long stageId);

    @Query("select t.id from RoadmapTask t where t.stageId in ?1")
    List<Long> getAllTasksInStages(List<Long> stageIds);

    @Query("select s.projectId from RoadmapTask t inner join RoadmapStage s on t.stageId = s.id where t.id = ?1")
    Optional<UUID> getTaskProjectId(long taskId);

    @Query("select t.stageId from RoadmapTask t where t.id = ?1")
    Optional<Long> getTaskStageId(long taskId);

    List<RoadmapTask> findAllByStageIdEquals(long stageId);

    Page<RoadmapTask> findAllByStageIdEquals(long stageId, Pageable pageable);

}
