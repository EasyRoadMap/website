package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapTask;

import java.util.List;
import java.util.UUID;

public interface RoadMapTaskRepository extends PagingAndSortingRepository<RoadMapTask, Long> {

    List<RoadMapTask> findAllByStageIdEquals(long stageId, Pageable pageable, Sort sort);

}
