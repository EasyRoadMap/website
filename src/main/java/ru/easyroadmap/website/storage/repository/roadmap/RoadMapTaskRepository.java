package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapTask;

public interface RoadMapTaskRepository extends PagingAndSortingRepository<RoadMapTask, Long>, JpaRepository<RoadMapTask, Long> {

    Page<RoadMapTask> findAllByStageIdEquals(long stageId, Pageable pageable);

}
