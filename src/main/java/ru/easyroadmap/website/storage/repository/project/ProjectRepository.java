package ru.easyroadmap.website.storage.repository.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    int countAllByWorkspaceIdEquals(UUID workspaceId);

    void deleteAllByWorkspaceIdEquals(UUID workspaceId);

    @Query("select p.id from Project p where p.workspaceId = ?1")
    List<UUID> getAllProjectIdsInWorkspace(UUID workspaceId);

    @Query("select p from ProjectMember m inner join Project p on m.projectId = p.id where m.userEmail = ?1 and p.workspaceId = ?2")
    List<Project> getJoinedProjects(String userEmail, UUID workspaceId);

    @Query("select p.id from ProjectMember m inner join Project p on m.projectId = p.id where m.userEmail = ?1 and p.workspaceId = ?2")
    List<UUID> getJoinedProjectsIds(String userEmail, UUID workspaceId);

    @Query("select w from Project p inner join Workspace w on p.workspaceId = w.id where p.id = ?1")
    Optional<Workspace> getProjectWorkspace(UUID projectId);

    @Query("select w.id from Project p inner join Workspace w on p.workspaceId = w.id where p.id = ?1")
    Optional<UUID> getProjectWorkspaceId(UUID projectId);

    @Query("select w.adminId from Project p inner join Workspace w on p.workspaceId = w.id where p.id = ?1")
    Optional<String> getProjectWorkspaceAdminId(UUID projectId);

    @Query("select p from Project p inner join Workspace w on p.workspaceId = w.id where p.id = ?1 and w.adminId = ?2")
    Optional<Project> getProjectAsWorkspaceAdmin(UUID projectId, String userEmail);

    @Query("select p from ProjectMember m inner join Project p on m.projectId = p.id where p.id = ?1 and m.userEmail = ?2")
    Optional<Project> getProjectAsMember(UUID projectId, String userEmail);

    @Query("select wm from WorkspaceMember wm where wm.workspaceId = ?1 and wm.userEmail not in (select pm.userEmail from ProjectMember pm where pm.projectId = ?2)")
    List<WorkspaceMember> getAttachableWorkspaceMembers(UUID workspaceId, UUID projectId);

    boolean existsByIdEqualsAndWorkspaceIdEquals(UUID projectId, UUID workspaceId);

    List<Project> findAllByWorkspaceIdEquals(UUID workspaceId);

}
