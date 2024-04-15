package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberInvitationRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class WorkspaceService {

    private static final int MAX_JOINED_WORKSPACES = 5;
    private static final int MAX_MEMBERS_PER_PROJECT = 10;

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final WorkspaceMemberInvitationRepository invitationRepository;

    public Workspace createWorkspace(User user, String name, String description) throws ApiException {
        int joinedWorkspaces = memberRepository.countAllByUserEmailEquals(user.getEmail());
        if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
            throw new ApiException("too_many_joined_workspaces", "You cannot be a member of more than 5 workspaces");

        Workspace workspace = new Workspace(name, description, user.getEmail(), Theme.LIGHT, Workspace.DEFAULT_ACCENT_COLOR);
        workspaceRepository.save(workspace);
        return workspace;
    }

    public List<Workspace> getJoinedWorkspaces(User user) {
        List<WorkspaceMember> members = memberRepository.findAllByUserEmailEquals(user.getEmail());
        if (members == null || members.isEmpty())
            return Collections.emptyList();

        return members.stream()
                .map(WorkspaceMember::getWorkspaceId)
                .map(workspaceRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();
    }

    public List<WorkspaceMember> getWorkspaceMembers(User user, UUID workspaceId) throws ApiException {
        if (!memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(user.getEmail(), workspaceId))
            throw new ApiException("not_a_member", "You're not a member of this workspace");

        return memberRepository.findAllByWorkspaceIdEquals(workspaceId);
    }

    public void deleteWorkspace(Workspace workspace) {
        workspaceRepository.delete(workspace);
    }

    public WorkspaceMember joinToWorkspace(User user, UUID workspaceId, String role, boolean ignoreLimits) throws ApiException {
        if (!ignoreLimits) {
            int joinedWorkspaces = memberRepository.countAllByUserEmailEquals(user.getEmail());
            if (joinedWorkspaces >= MAX_JOINED_WORKSPACES)
                throw new ApiException("too_many_joined_workspaces", "You cannot be a member of more than 5 workspaces");

            int membersCount = memberRepository.countAllByWorkspaceIdEquals(workspaceId);
            if (membersCount >= MAX_MEMBERS_PER_PROJECT)
                throw new ApiException("workspace_members_limit_exceeded", "No more than 10 users can be in the workspace");
        }

        if (memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(user.getEmail(), workspaceId))
            throw new ApiException("already_joined", "You're already joined to this workspace");

        WorkspaceMember member = new WorkspaceMember(workspaceId, user.getEmail(), role);
        memberRepository.save(member);
        return member;
    }

    public WorkspaceMember leaveFromWorkspace(User user, UUID workspaceId) throws ApiException {
        WorkspaceMember member = memberRepository.findByUserEmailEqualsAndWorkspaceIdEquals(user.getEmail(), workspaceId)
                .orElseThrow(() -> new ApiException(
                        "not_a_member",
                        "You're not a member of this workspace"
                ));

        memberRepository.delete(member);
        return member;
    }

    public Workspace updateWorkspaceInfo(User user, UUID workspaceId, String name, String description) throws ApiException {
        Workspace workspace = requireWorkspaceAdminRights(user, workspaceId);
        workspace.setName(name);
        workspace.setDescription(description);
        return workspace;
    }

    public Workspace updateWorkspaceAppearance(User user, UUID workspaceId, Theme theme, Integer accentColor) throws ApiException {
        Workspace workspace = requireWorkspaceAdminRights(user, workspaceId);
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

    public Workspace requireWorkspaceAdminRights(User user, UUID workspaceId) throws ApiException {
        Workspace workspace = getWorkspace(workspaceId);

        if (!user.getEmail().equals(workspace.getAdminId()))
            throw new ApiException("not_enough_rights", "This action isn't available to you");

        return workspace;
    }

    public Workspace requireWorkspaceMembership(User user, UUID workspaceId) throws ApiException {
        Workspace workspace = getWorkspace(workspaceId);

        if (!memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(user.getEmail(), workspaceId))
            throw new ApiException("not_a_member", "You're not a member of this workspace");

        return workspace;
    }

    public boolean isMember(User user, UUID workspaceId) {
        return memberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(user.getEmail(), workspaceId);
    }

    public boolean isAdmin(User user, UUID workspaceId) {
        return workspaceRepository.existsByIdEqualsAndAdminIdEquals(workspaceId, user.getEmail());
    }

}
