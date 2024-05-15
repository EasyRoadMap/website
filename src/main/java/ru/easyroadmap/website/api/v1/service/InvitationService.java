package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.service.MailService;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceInvitationRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.apache.commons.io.IOUtils.closeQuietly;
import static ru.easyroadmap.website.api.v1.service.WorkspaceService.MAX_MEMBERS_PER_WORKSPACE;

@Service
@RequiredArgsConstructor
public final class InvitationService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final WorkspaceInvitationRepository workspaceInvitationRepository;

    private final MailService mailService;

    @Value("${server.host}")
    private String serverHost;

    public WorkspaceInvitation getInvitation(String userEmail, UUID invitationId) throws ApiException {
        return requireValidInvitation(userEmail, invitationId);
    }

    public List<WorkspaceInvitation> getNotExpiredInvitations(UUID workspaceId) {
        return workspaceInvitationRepository.getNotExpiredInvitations(workspaceId);
    }

    public WorkspaceInvitation inviteToWorkspace(User sender, User recipient, Workspace workspace, String role) throws ApiException {
        UUID workspaceId = workspace.getId();
        int usedMemberSlots = workspaceMemberRepository.countAllByWorkspaceIdEquals(workspaceId);
        usedMemberSlots += workspaceInvitationRepository.countNotExpiredInvitations(workspaceId);

        if (usedMemberSlots >= MAX_MEMBERS_PER_WORKSPACE)
            throw new ApiException("ws_full", "You cannot invite one more user to this workspace", MAX_MEMBERS_PER_WORKSPACE);

        WorkspaceInvitation invitation = workspaceInvitationRepository.getUserInvitation(recipient.getEmail(), workspaceId).orElse(null);
        if (invitation != null && !invitation.isExpired())
            throw new ApiException("user_already_invited", "An invitation was already sent to this user");

        if (invitation != null) {
            invitation.renew(sender.getEmail(), role);
        } else {
            invitation = new WorkspaceInvitation(workspaceId, sender.getEmail(), recipient.getEmail(), role);
        }

        workspaceInvitationRepository.save(invitation);

        String inviteUrl = serverHost + "/workspace/invite?invite_id=" + invitation.getId();

        String plainText = MessageFormat.format("""
                Hello, dear {0}!
                You''ve received an invitation to the {1} from the administrator {2}.
                Open this link to view the invitation:
                {3}
                """, recipient.getName(), workspace.getName(), sender.getName(), inviteUrl
        );

        InputStream resource = getClass().getResourceAsStream("/templates/mail/invitation.html");
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource, StandardCharsets.UTF_8));
        String html = reader.lines().map(String::trim).collect(Collectors.joining("\n"));
        closeQuietly(reader);

        html = html.replace("{{invite_url}}", inviteUrl)
                .replace("{{user}}", recipient.getName())
                .replace("{{workspace}}", workspace.getName())
                .replace("{{admin}}", sender.getName());

        mailService.sendMailAsync(recipient.getEmail(), "EasyRoadMap - Приглашение в рабочую область", plainText, html);
        return invitation;
    }

    public void abortInvitation(Workspace workspace, String otherUserEmail) throws ApiException {
        WorkspaceInvitation invitation = workspaceInvitationRepository.getUserInvitation(otherUserEmail, workspace.getId()).orElseThrow(() -> new ApiException(
                "invitation_not_found",
                "Requested user wasn't invited yet"
        ));

        UUID workspaceId = invitation.getWorkspaceId();
        if (!workspaceRepository.existsById(workspaceId))
            throw new ApiException("invitation_ownerless", "The invitation targeted workspace doesn't exists");

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
                "An invitation with this ID doesn't exists"
        ));

        if (!invitation.getInvitedUserEmail().equals(userEmail))
            throw new ApiException("invitation_not_yours", "The invitation belongs to other user");

        UUID workspaceId = invitation.getWorkspaceId();
        if (!workspaceRepository.existsById(workspaceId))
            throw new ApiException("invitation_ownerless", "The invitation targeted workspace doesn't exists");

        if (invitation.isExpired())
            throw new ApiException("invitation_expired", "The invitation is expired");

        if (!invitation.getInviterUserEmail().equals(workspaceRepository.getWorkspaceAdminId(workspaceId).orElse(null)))
            throw new ApiException("inviter_not_longer_admin", "The invitation sender isn't an admin of the targeted workspace");

        if (workspaceMemberRepository.existsByUserEmailEqualsAndWorkspaceIdEquals(userEmail, workspaceId))
            throw new ApiException("already_joined", "You're already joined to this workspace");

        return invitation;
    }

}
