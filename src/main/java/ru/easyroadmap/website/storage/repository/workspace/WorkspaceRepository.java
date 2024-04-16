package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {

    @Query("select w from WorkspaceMember m inner join Workspace w on m.workspaceId = w.id where m.userEmail = ?1")
    List<Workspace> getJoinedWorkspaces(String userEmail);

    @Query("select w.adminId from Workspace w where w.id = ?1")
    Optional<String> getWorkspaceAdminId(UUID workspaceId);

    @Query("select w from Workspace w where w.id = ?1 and w.adminId = ?2")
    Optional<Workspace> getWorkspaceAsAdmin(UUID workspaceId, String userEmail);

    @Query("select w from WorkspaceMember m inner join Workspace w on m.workspaceId = w.id where m.workspaceId = ?1 and m.userEmail = ?2")
    Optional<Workspace> getWorkspaceAsMember(UUID workspaceId, String userEmail);

}
