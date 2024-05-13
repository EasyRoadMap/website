package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {

    int countAllByUserEmailEquals(String userEmail);

    int countAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    boolean existsByUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    List<WorkspaceMember> findAllByWorkspaceIdEquals(UUID workspaceId);

    Optional<WorkspaceMember> findByUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    @Query("select m.role from WorkspaceMember m where m.userEmail = ?1 and m.workspaceId = ?2")
    String getWorkspaceMemberRole(String userEmail, UUID workspaceId);

}
