package ru.easyroadmap.website.storage.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.project.ProjectMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    int countAllByUserEmailEquals(String userEmail);

    int countAllByProjectIdEquals(UUID projectId);

    void deleteAllByProjectIdEquals(UUID projectId);

    void deleteAllByProjectIdIn(List<UUID> projectIds);

    void deleteAllByUserEmailEquals(String userEmail);

    boolean existsByUserEmailEqualsAndProjectIdEquals(String userEmail, UUID projectId);

    List<ProjectMember> findAllByUserEmailEquals(String userEmail);

    List<ProjectMember> findAllByProjectIdEquals(UUID projectId);

    Optional<ProjectMember> findByUserEmailEqualsAndProjectIdEquals(String userEmail, UUID projectId);

}
