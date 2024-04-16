package ru.easyroadmap.website.storage.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.project.ProjectLink;

import java.util.List;
import java.util.UUID;

public interface ProjectLinkRepository extends JpaRepository<ProjectLink, Long> {

    int countAllByProjectIdEquals(UUID projectId);

    void deleteAllByProjectIdEquals(UUID projectId);

    void deleteAllByProjectIdIn(List<UUID> projectIds);

    void deleteAllByIdIn(List<Long> ids);

    List<ProjectLink> findAllByProjectIdEquals(UUID projectId);

}
