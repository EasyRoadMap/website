package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapStage;

import java.util.List;
import java.util.UUID;

public interface RoadMapStageRepository extends PagingAndSortingRepository<RoadMapStage, Long> {

    List<RoadMapStage> findAllByProjectIdEquals(UUID projectId, Pageable pageable, Sort sort);

}
