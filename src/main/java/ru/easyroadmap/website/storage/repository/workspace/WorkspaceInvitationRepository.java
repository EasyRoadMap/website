package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkspaceInvitationRepository extends JpaRepository<WorkspaceInvitation, UUID> {

    @Query("select count(*) from WorkspaceInvitation i where i.workspaceId = ?1 and i.expiresAt > current timestamp")
    int countNotExpiredInvitations(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    boolean existsByInvitedUserEmailEqualsAndWorkspaceIdEquals(String userEmail, UUID workspaceId);

    @Query("select i from WorkspaceInvitation i where i.workspaceId = ?1 and i.expiresAt > current timestamp")
    List<WorkspaceInvitation> getNotExpiredInvitations(UUID workspaceId);

    @Query("select i from WorkspaceInvitation i where i.invitedUserEmail = ?1 and i.workspaceId = ?2")
    Optional<WorkspaceInvitation> getUserInvitation(String userEmail, UUID workspaceId);

}
