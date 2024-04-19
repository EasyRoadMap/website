package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapStage;

import java.util.UUID;

public interface RoadMapStageRepository extends PagingAndSortingRepository<RoadMapStage, Long>, JpaRepository<RoadMapStage, Long> {

    int countAllByProjectIdEquals(UUID projectId);

    Page<RoadMapStage> findAllByProjectIdEquals(UUID projectId, Pageable pageable);

}
