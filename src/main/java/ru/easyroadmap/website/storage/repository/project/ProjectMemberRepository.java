package ru.easyroadmap.website.storage.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    void deleteAllByUserEmailEqualsAndProjectIdIn(String userEmail, List<UUID> projectIds);

    void deleteAllByUserEmailEqualsAndProjectIdEquals(String userEmail, UUID projectId);

    boolean existsByUserEmailEqualsAndProjectIdEquals(String userEmail, UUID projectId);

    List<ProjectMember> findAllByUserEmailEquals(String userEmail);

    List<ProjectMember> findAllByProjectIdEquals(UUID projectId);

    Optional<ProjectMember> findByUserEmailEqualsAndProjectIdEquals(String userEmail, UUID projectId);

    @Query("select m.userEmail from ProjectMember m where m.projectId = ?1")
    List<String> getProjectMemberEmails(UUID projectId);

}
