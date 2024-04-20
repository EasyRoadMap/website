package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;

import java.util.UUID;

public interface RoadmapStageRepository extends PagingAndSortingRepository<RoadmapStage, Long>, JpaRepository<RoadmapStage, Long> {

    int countAllByProjectIdEquals(UUID projectId);

    Page<RoadmapStage> findAllByProjectIdEquals(UUID projectId, Pageable pageable);

}
