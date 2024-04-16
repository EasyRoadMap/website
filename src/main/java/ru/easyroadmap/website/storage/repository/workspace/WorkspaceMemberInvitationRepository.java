package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMemberInvitation;

import java.util.List;
import java.util.UUID;

public interface WorkspaceMemberInvitationRepository extends JpaRepository<WorkspaceMemberInvitation, UUID> {

    int countAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    List<WorkspaceMemberInvitation> findAllByWorkspaceIdEquals(UUID workspaceId);

}
