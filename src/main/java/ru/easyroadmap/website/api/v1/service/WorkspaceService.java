package ru.easyroadmap.website.api.v1.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.project.ProjectMember;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;
import ru.easyroadmap.website.storage.repository.project.ProjectLinkRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskAttachmentRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceInvitationRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkspaceService {

    public static final int MAX_JOINED_WORKSPACES = 5;
    public static final int MAX_MEMBERS_PER_WORKSPACE = 10;

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final WorkspaceInvitationRepository workspaceInvitationRepository;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectLinkRepository projectLinkRepository;

    private final RoadmapStageRepository roadmapStageRepository;
    private final RoadmapTaskRepository roadmapTaskRepository;
    private final RoadmapTaskAttachmentRepository roadmapTaskAttachmentRepository;

    public Workspace createWorkspace(String userEmail, String name, String description) throws ApiException {
        int joinedWorkspaces = workspaceMemberRepository.countAllByUserEmailEquals(userEmail);
        if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
            throw new ApiException("too_many_joined_workspaces", "You cannot be a member of more than %d workspaces".formatted(MAX_JOINED_WORKSPACES), MAX_JOINED_WORKSPACES);

        Workspace workspace = new Workspace(name, description, userEmail, Theme.LIGHT, Workspace.DEFAULT_ACCENT_COLOR);
        workspaceRepository.save(workspace);
        return workspace;
    }

    public List<Workspace> getJoinedWorkspaces(String userEmail) {
        return workspaceRepository.getJoinedWorkspaces(userEmail);
    }

    public List<WorkspaceMember> getWorkspaceMembers(UUID workspaceId) {
        return workspaceMemberRepository.findAllByWorkspaceIdEquals(workspaceId);
    }

    public void deleteWorkspace(UUID workspaceId) {
        List<UUID> projectIds = projectRepository.getAllProjectIdsInWorkspace(workspaceId);
        if (!projectIds.isEmpty()) {
            List<Long> roadmapStageIds = roadmapStageRepository.getAllStagesInProjects(projectIds);
            if (!roadmapStageIds.isEmpty()) {
                List<Long> roadmapTaskIds = roadmapTaskRepository.getAllTasksInStages(roadmapStageIds);
                if (!roadmapTaskIds.isEmpty()) {
                    roadmapTaskAttachmentRepository.deleteAllByTaskIdIn(roadmapTaskIds);
                    roadmapTaskRepository.deleteAllByStageIdIn(roadmapStageIds);
                }

                roadmapStageRepository.deleteAllByProjectIdIn(projectIds);
            }

            projectLinkRepository.deleteAllByProjectIdIn(projectIds);
            projectMemberRepository.deleteAllByProjectIdIn(projectIds);
            projectRepository.deleteAllByWorkspaceIdEquals(workspaceId);
        }

        workspaceInvitationRepository.deleteAllByWorkspaceIdEquals(workspaceId);
        workspaceMemberRepository.deleteAllByWorkspaceIdEquals(workspaceId);
        workspaceRepository.deleteById(workspaceId);
    }

    public WorkspaceMember addToWorkspace(UUID workspaceId, String otherUserEmail, String role, boolean ignoreLimits) throws ApiException {
        if (!ignoreLimits) {
            int joinedWorkspaces = workspaceMemberRepository.countAllByUserEmailEquals(otherUserEmail);
            if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
                throw new ApiException("too_many_joined_workspaces", "Requested user cannot be a member of more than %d workspaces".formatted(MAX_JOINED_WORKSPACES), MAX_JOINED_WORKSPACES);

            int membersCount = workspaceMemberRepository.countAllByWorkspaceIdEquals(workspaceId);
            if (membersCount >= MAX_MEMBERS_PER_WORKSPACE)
                throw new ApiException("ws_full", "No more than %d users can be in the workspace".formatted(MAX_MEMBERS_PER_WORKSPACE), MAX_MEMBERS_PER_WORKSPACE);
        }

        if (workspaceMemberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId))
            throw new ApiException("already_joined", "Requested user is already joined to this workspace");

        WorkspaceMember member = new WorkspaceMember(workspaceId, otherUserEmail, role);
        workspaceMemberRepository.save(member);
        return member;
    }

    public void kickFromWorkspace(UUID workspaceId, String otherUserEmail) throws ApiException {
        if (isAdmin(otherUserEmail, workspaceId))
            throw new ApiException("target_is_admin", "Requested user is an admin of this workspace");

        if (!isMember(otherUserEmail, workspaceId))
            throw new ApiException("target_not_a_member", "Requested user isn't a member of this workspace");

        List<UUID> joinedProjectsIds = projectRepository.getJoinedProjectsIds(otherUserEmail, workspaceId);
        if (!joinedProjectsIds.isEmpty())
            projectMemberRepository.deleteAllByUserEmailEqualsAndProjectIdIn(otherUserEmail, joinedProjectsIds);

        workspaceMemberRepository.deleteAllByUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId);
    }

    public void joinToWorkspace(String userEmail, UUID workspaceId) throws ApiException {
        if (workspaceMemberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId))
            throw new ApiException("already_joined", "You're already joined to this workspace");

        WorkspaceMember member = new WorkspaceMember(workspaceId, userEmail, null);
        workspaceMemberRepository.save(member);
    }

    public void leaveFromWorkspace(String userEmail, UUID workspaceId) throws ApiException {
        if (isAdmin(userEmail, workspaceId))
            throw new ApiException("ws_denied_for_admin", "You're an admin of this workspace");

        if (!isMember(userEmail, workspaceId))
            throw new ApiException("ws_membership_required", "You're not a member of this workspace");

        List<UUID> joinedProjectsIds = projectRepository.getJoinedProjectsIds(userEmail, workspaceId);
        if (!joinedProjectsIds.isEmpty())
            projectMemberRepository.deleteAllByUserEmailEqualsAndProjectIdIn(userEmail, joinedProjectsIds);

        workspaceMemberRepository.deleteAllByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId);
    }

    public void transferOwnership(Workspace workspace, String otherUserEmail) throws ApiException {
        if (!isMember(otherUserEmail, workspace.getId()))
            throw new ApiException("user_not_a_member", "Requested user isn't a member of this workspace");

        workspace.setAdminId(otherUserEmail);
        workspaceRepository.save(workspace);

        workspaceInvitationRepository.deleteAllByWorkspaceIdEquals(workspace.getId());

        List<UUID> projectIds = projectRepository.getAllProjectIdsInWorkspace(workspace.getId());
        List<UUID> joinedProjectsIds = projectRepository.getJoinedProjectsIds(otherUserEmail, workspace.getId());

        for (UUID projectId : projectIds) {
            if (joinedProjectsIds.contains(projectId))
                continue;

            ProjectMember member = new ProjectMember(projectId, otherUserEmail, null);
            projectMemberRepository.save(member);
        }
    }

    public String getMemberRole(String userEmail, UUID workspaceId) {
        return workspaceMemberRepository.getWorkspaceMemberRole(userEmail, workspaceId);
    }

    public void changeMemberRole(UUID workspaceId, String otherUserEmail, String role) throws ApiException {
        WorkspaceMember member = workspaceMemberRepository.findByUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId).orElseThrow(() -> new ApiException(
                "target_not_a_member",
                "Requested user isn't a member of this workspace"
        ));

        member.setRole(role);
        workspaceMemberRepository.save(member);
    }

    public void updateWorkspaceInfo(Workspace workspace, String name, String description) {
        workspace.setName(name);
        workspace.setDescription(description);
        workspaceRepository.save(workspace);
    }

    public void updateWorkspaceAppearance(Workspace workspace, Theme theme, Integer accentColor) {
        workspace.setTheme(theme);
        workspace.setAccentColor(accentColor);
        workspaceRepository.save(workspace);
    }

    public Workspace getWorkspace(UUID workspaceId) throws ApiException {
        return workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ApiException(
                        "workspace_not_exists",
                        "There is no workspace with this ID"
                ));
    }

    public boolean isWorkspaceExist(UUID workspaceId) {
        return workspaceRepository.existsById(workspaceId);
    }

    public void requireWorkspaceExistance(UUID workspaceId) throws ApiException {
        if (!isWorkspaceExist(workspaceId)) {
            throw new ApiException("ws_not_exists", "There is no workspace with this ID");
        }
    }

    public Workspace requireWorkspaceAdminRights(String userEmail, UUID workspaceId) throws ApiException {
        requireWorkspaceExistance(workspaceId);
        return workspaceRepository.getWorkspaceAsAdmin(workspaceId, userEmail).orElseThrow(() -> new ApiException(
                "ws_ownership_required",
                "You're not an admin of this workspace"
        ));
    }

    public Workspace requireWorkspaceMembership(String userEmail, UUID workspaceId) throws ApiException {
        requireWorkspaceExistance(workspaceId);
        return workspaceRepository.getWorkspaceAsMember(workspaceId, userEmail).orElseThrow(() -> new ApiException(
                "ws_membership_required",
                "You're not a member of this workspace"
        ));
    }

    public boolean isAdmin(String userEmail, UUID workspaceId) {
        Optional<String> adminId = workspaceRepository.getWorkspaceAdminId(workspaceId);
        return adminId.isPresent() && adminId.get().equals(userEmail);
    }

    public boolean isMember(String userEmail, UUID workspaceId) {
        return workspaceMemberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId);
    }

}
