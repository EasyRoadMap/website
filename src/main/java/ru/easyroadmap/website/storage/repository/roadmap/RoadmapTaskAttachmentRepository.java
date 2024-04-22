package ru.easyroadmap.website.storage.repository.roadmap;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;

import java.util.List;

public interface RoadmapTaskAttachmentRepository extends JpaRepository<RoadmapTaskAttachment, Long> {

    int countAllByTaskIdEquals(long taskId);

    List<RoadmapTaskAttachment> findAllByTaskIdEquals(long taskId);

}
