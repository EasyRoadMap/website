package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {

    int countAllByUserEmailEquals(String userEmail);

    int countAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    boolean existsByUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    List<WorkspaceMember> findAllByWorkspaceIdEquals(UUID workspaceId);

    Optional<WorkspaceMember> findByUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

}
