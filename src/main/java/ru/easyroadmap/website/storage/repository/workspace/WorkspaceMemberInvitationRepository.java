package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMemberInvitation;

import java.util.List;

public interface WorkspaceMemberInvitationRepository extends JpaRepository<WorkspaceMemberInvitation, String> {

    List<WorkspaceMemberInvitation> findAllByWorkspaceIdEquals(String workspaceId);

    int countAllByWorkspaceIdEquals(String workspaceId);

}
