package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceInvitationRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class InvitationService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final WorkspaceInvitationRepository workspaceInvitationRepository;

    public WorkspaceInvitation getInvitation(String userEmail, UUID invitationId) throws ApiException {
        return requireValidInvitation(userEmail, invitationId);
    }

    public List<WorkspaceInvitation> getNotExpiredInvitations(UUID workspaceId) {
        return workspaceInvitationRepository.getNotExpiredInvitations(workspaceId);
    }

    public WorkspaceInvitation inviteToWorkspace(String userEmail, UUID workspaceId, String otherUserEmail, String role) throws ApiException {
        int usedMemberSlots = workspaceMemberRepository.countAllByWorkspaceIdEquals(workspaceId);
        usedMemberSlots += workspaceInvitationRepository.countNotExpiredInvitations(workspaceId);

        if (usedMemberSlots >= WorkspaceService.MAX_MEMBERS_PER_WORKSPACE)
            throw new ApiException("workspace_is_full", "You cannot invite one more user to this workspace");

        WorkspaceInvitation invitation = workspaceInvitationRepository.getUserInvitation(otherUserEmail, workspaceId).orElse(null);
        if (invitation != null && !invitation.isExpired())
            throw new ApiException("user_already_invited", "An invitation was already sent to this user");

        if (invitation != null) {
            invitation.renew(userEmail, role);
        } else {
            invitation = new WorkspaceInvitation(workspaceId, userEmail, otherUserEmail, role);
        }

        workspaceInvitationRepository.save(invitation);
        return invitation;
    }

    public void abortInvitation(Workspace workspace, String otherUserEmail) throws ApiException {
        WorkspaceInvitation invitation = workspaceInvitationRepository.getUserInvitation(otherUserEmail, workspace.getId()).orElseThrow(() -> new ApiException(
                "invitation_not_found",
                "Requested user wasn't invited yet"
        ));

        UUID workspaceId = invitation.getWorkspaceId();
        if (!workspaceRepository.existsById(workspaceId))
            throw new ApiException("workspace_not_found", "The invitation targeted workspace isn't exist");

        if (invitation.isExpired())
            throw new ApiException("invitation_expired", "The invitation is expired");

        workspaceInvitationRepository.delete(invitation);
    }

    public WorkspaceInvitation acceptInvitation(String userEmail, UUID invitationId) throws ApiException {
        WorkspaceInvitation invitation = requireValidInvitation(userEmail, invitationId);
        workspaceInvitationRepository.delete(invitation);
        return invitation;
    }

    public WorkspaceInvitation declineInvitation(String userEmail, UUID invitationId) throws ApiException {
        WorkspaceInvitation invitation = requireValidInvitation(userEmail, invitationId);
        workspaceInvitationRepository.delete(invitation);
        return invitation;
    }

    private WorkspaceInvitation requireValidInvitation(String userEmail, UUID invitationId) throws ApiException {
        WorkspaceInvitation invitation = workspaceInvitationRepository.findById(invitationId).orElseThrow(() -> new ApiException(
                "invitation_not_found",
                "An invitation with this ID isn't exist"
        ));

        if (!invitation.getInvitedUserEmail().equals(userEmail))
            throw new ApiException("invitation_not_yours", "The invitation belongs to other user");

        UUID workspaceId = invitation.getWorkspaceId();
        if (!workspaceRepository.existsById(workspaceId))
            throw new ApiException("workspace_not_found", "The invitation targeted workspace isn't exist");

        if (invitation.isExpired())
            throw new ApiException("invitation_expired", "The invitation is expired");

        if (!invitation.getInviterUserEmail().equals(workspaceRepository.getWorkspaceAdminId(workspaceId).orElse(null)))
            throw new ApiException("inviter_not_admin", "The invitation sender isn't an admin of the targeted workspace");

        if (workspaceMemberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId))
            throw new ApiException("already_joined", "You're already joined to this workspace");

        return invitation;
    }

}
