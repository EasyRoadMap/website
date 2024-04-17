package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMemberInvitation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkspaceMemberInvitationRepository extends JpaRepository<WorkspaceMemberInvitation, UUID> {

    int countAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    boolean existsByInvitedUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    List<WorkspaceMemberInvitation> findAllByWorkspaceIdEquals(UUID workspaceId);

    Optional<WorkspaceMemberInvitation> findByInvitedUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

}
