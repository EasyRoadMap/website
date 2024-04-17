package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMemberInvitation;
import ru.easyroadmap.website.storage.repository.project.ProjectLinkRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberInvitationRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class WorkspaceService {

    private static final int MAX_JOINED_WORKSPACES = 5;
    private static final int MAX_MEMBERS_PER_WORKSPACE = 10;

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final WorkspaceMemberInvitationRepository invitationRepository;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectLinkRepository projectLinkRepository;

    public Workspace createWorkspace(String userEmail, String name, String description) throws ApiException {
        int joinedWorkspaces = memberRepository.countAllByUserEmailEquals(userEmail);
        if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
            throw new ApiException("too_many_joined_workspaces", "You cannot be a member of more than 5 workspaces");

        Workspace workspace = new Workspace(name, description, userEmail, Theme.LIGHT, Workspace.DEFAULT_ACCENT_COLOR);
        workspaceRepository.save(workspace);
        return workspace;
    }

    public List<Workspace> getJoinedWorkspaces(String userEmail) {
        return workspaceRepository.getJoinedWorkspaces(userEmail);
    }

    public List<WorkspaceMember> getWorkspaceMembers(UUID workspaceId) {
        return memberRepository.findAllByWorkspaceIdEquals(workspaceId);
    }

    public void deleteWorkspace(UUID workspaceId) {
        List<UUID> projectIds = projectRepository.getAllProjectIdsInWorkspace(workspaceId);
        projectLinkRepository.deleteAllByProjectIdIn(projectIds);
        projectMemberRepository.deleteAllByProjectIdIn(projectIds);
        projectRepository.deleteAllByWorkspaceIdEquals(workspaceId);
        memberRepository.deleteAllByWorkspaceIdEquals(workspaceId);
        workspaceRepository.deleteById(workspaceId);
    }

    public WorkspaceMember addToWorkspace(UUID workspaceId, String otherUserEmail, String role, boolean ignoreLimits) throws ApiException {
        if (!ignoreLimits) {
            int joinedWorkspaces = memberRepository.countAllByUserEmailEquals(otherUserEmail);
            if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
                throw new ApiException("too_many_joined_workspaces", "Requested user cannot be a member of more than 5 workspaces");

            int membersCount = memberRepository.countAllByWorkspaceIdEquals(workspaceId);
            if (membersCount >= MAX_MEMBERS_PER_WORKSPACE)
                throw new ApiException("workspace_members_limit_exceeded", "No more than 10 users can be in the workspace");
        }

        if (memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId))
            throw new ApiException("already_joined", "Requested user is already joined to this workspace");

        WorkspaceMember member = new WorkspaceMember(workspaceId, otherUserEmail, role);
        memberRepository.save(member);
        return member;
    }

    public WorkspaceMemberInvitation inviteToWorkspace(String userEmail, UUID workspaceId, String otherUserEmail, String role) throws ApiException {
        WorkspaceMemberInvitation invitation = invitationRepository.findByInvitedUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId).orElse(null);
        if (invitation != null && !invitation.isExpired())
            throw new ApiException("user_already_invited", "An invitation was already sent to this user");

        if (invitation != null) {
            invitation.renew(userEmail, role);
        } else {
            invitation = new WorkspaceMemberInvitation(workspaceId, userEmail, otherUserEmail, role);
        }

        invitationRepository.save(invitation);
        return invitation;
    }

    public WorkspaceMember kickFromWorkspace(UUID workspaceId, String otherUserEmail) throws ApiException {
        WorkspaceMember member = memberRepository.findByUserEmailEqualsAndWorkspaceIdEquals(otherUserEmail, workspaceId)
                .orElseThrow(() -> new ApiException(
                        "not_a_member",
                        "Requested user isn't a member of this workspace"
                ));

        projectMemberRepository.deleteAllByUserEmailEquals(otherUserEmail);
        memberRepository.delete(member);
        return member;
    }

    public void joinToWorkspace(String userEmail, UUID workspaceId) throws ApiException {
        if (memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId))
            throw new ApiException("already_joined", "You're already joined to this workspace");

        WorkspaceMember member = new WorkspaceMember(workspaceId, userEmail, null);
        memberRepository.save(member);
    }

    public WorkspaceMember leaveFromWorkspace(String userEmail, UUID workspaceId) throws ApiException {
        WorkspaceMember member = memberRepository.findByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId)
                .orElseThrow(() -> new ApiException(
                        "not_a_member",
                        "You're not a member of this workspace"
                ));

        projectMemberRepository.deleteAllByUserEmailEquals(userEmail);
        memberRepository.delete(member);
        return member;
    }

    public Workspace updateWorkspaceInfo(Workspace workspace, String name, String description) {
        workspace.setName(name);
        workspace.setDescription(description);
        return workspace;
    }

    public Workspace updateWorkspaceAppearance(Workspace workspace, Theme theme, Integer accentColor) {
        workspace.setTheme(theme);
        workspace.setAccentColor(accentColor);
        return workspace;
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
            throw new ApiException("workspace_not_exists", "There is no workspace with this ID");
        }
    }

    public Workspace requireWorkspaceAdminRights(String userEmail, UUID workspaceId) throws ApiException {
        requireWorkspaceExistance(workspaceId);
        return workspaceRepository.getWorkspaceAsAdmin(workspaceId, userEmail).orElseThrow(() -> new ApiException(
                "not_enough_rights",
                "This action isn't available to you"
        ));
    }

    public Workspace requireWorkspaceMembership(String userEmail, UUID workspaceId) throws ApiException {
        requireWorkspaceExistance(workspaceId);
        return workspaceRepository.getWorkspaceAsMember(workspaceId, userEmail).orElseThrow(() -> new ApiException(
                "not_a_member",
                "You're not a member of this workspace"
        ));
    }

    public boolean isAdmin(String userEmail, UUID workspaceId) {
        Optional<String> adminId = workspaceRepository.getWorkspaceAdminId(workspaceId);
        return adminId.isPresent() && adminId.get().equals(userEmail);
    }

    public boolean isMember(String userEmail, UUID workspaceId) {
        return memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId);
    }

}
