package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.dto.ConfirmByPasswordDto;
import ru.easyroadmap.website.api.v1.dto.UserAddMemberDto;
import ru.easyroadmap.website.api.v1.dto.UserIdentifierDto;
import ru.easyroadmap.website.api.v1.dto.workspace.WorkspaceDataDto;
import ru.easyroadmap.website.api.v1.dto.workspace.WorkspaceAppearanceDto;
import ru.easyroadmap.website.api.v1.model.DomainCardModel;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.workspace.*;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceInvitationModel.Inviter;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceInvitationModel.Recipient;
import ru.easyroadmap.website.api.v1.service.*;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceInvitation;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.*;

@RestController
@RequestMapping("/api/v1/workspace")
@RequiredArgsConstructor
public class WorkspaceApiController extends ApiControllerBase {

    private final UserService userService;
    private final WorkspaceService workspaceService;
    private final InvitationService invitationService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;
    private final ProjectService projectService;

    @Operation(summary = "Create a new workspace", tags = "workspace-api")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public WorkspaceModel createWorkspace(@Valid WorkspaceDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.createWorkspace(userEmail, dto.getName(), dto.getDescription());
        workspaceService.joinToWorkspace(userEmail, workspace.getId());
        return WorkspaceModel.fromWorkspace(workspace, null, null, true);
    }

    @Operation(summary = "Get a workspace model", tags = "workspace-api")
    @GetMapping
    public WorkspaceModel getWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspaceId));
        return WorkspaceModel.fromWorkspace(workspace, photoModel, userEmail.equals(workspace.getAdminId()), true);
    }

    @Operation(summary = "Get a list of joined workspace projects", tags = "workspace-api")
    @GetMapping("/projects")
    public ResponseEntity<List<DomainCardModel>> getWorkspaceProjects(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceMembership(userEmail, workspaceId);

        List<Project> joinedProjects = projectService.getJoinedProjects(userEmail, workspaceId);
        List<DomainCardModel> result = new ArrayList<>();

        for (Project project : joinedProjects) {
            UUID projectId = project.getId();
            PhotoModel projectPhoto = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
            List<String> members = projectService.getProjectMemberEmails(projectId);

            int membersCount = members.size();
            List<PhotoModel> memberPhotos = members.stream()
                    .limit(3L)
                    .map(PhotoService::generateUserPhotoID)
                    .map(photoService::getPhotoModelOrDefaultPicture)
                    .toList();

            result.add(new DomainCardModel(projectId, project.getName(), projectPhoto, membersCount, memberPhotos));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a list of workspace members", tags = "workspace-api")
    @GetMapping("/members")
    public ResponseEntity<List<WorkspaceMemberModel>> getWorkspaceMembers(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceMembership(userEmail, workspaceId);

        List<WorkspaceMember> members = workspaceService.getWorkspaceMembers(workspaceId);
        List<WorkspaceInvitation> invitations = invitationService.getNotExpiredInvitations(workspaceId);
        String adminId = workspaceService.getWorkspace(workspaceId).getAdminId();
        boolean isAdmin = userEmail.equals(adminId);

        List<WorkspaceMemberModel> result = new ArrayList<>();

        for (WorkspaceMember member : members) {
            String memberEmail = member.getUserEmail();
            Optional<User> user = userService.findByEmail(memberEmail);
            if (user.isEmpty())
                continue;

            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(memberEmail));
            UserModel userModel = UserModel.fromUser(user.get(), photoModel, isAdmin); // include email for admin's request
            result.add(WorkspaceMemberModel.fromWorkspaceMember(member, userModel, memberEmail.equals(adminId)));
        }

        for (WorkspaceInvitation invitation : invitations) {
            String invitedUserEmail = invitation.getInvitedUserEmail();
            Optional<User> user = userService.findByEmail(invitedUserEmail);
            if (user.isEmpty())
                continue;

            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(invitedUserEmail));
            UserModel userModel = UserModel.fromUser(user.get(), photoModel, isAdmin); // include email for admin's request
            result.add(WorkspaceMemberModel.fromWorkspaceInvitation(invitation, userModel));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a workspace info model", tags = "workspace-api")
    @GetMapping("/info")
    public WorkspaceInfoModel getWorkspaceInfo(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return workspace.createInfoModel();
    }

    @Operation(summary = "Set a workspace info", tags = "workspace-api")
    @PutMapping(value = "/info", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putWorkspaceInfo(@RequestParam("ws_id") UUID workspaceId, @Valid WorkspaceDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        workspaceService.updateWorkspaceInfo(workspace, dto.getName(), dto.getDescription());
    }

    @Operation(summary = "Get a workspace appearance model", tags = "workspace-api")
    @GetMapping("/appearance")
    public WorkspaceAppearanceModel getWorkspaceAppearance(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return workspace.createAppearanceModel();
    }

    @Operation(summary = "Set a workspace appearance", tags = "workspace-api")
    @PutMapping(value = "/appearance", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putWorkspaceAppearance(@RequestParam("ws_id") UUID workspaceId, @Valid WorkspaceAppearanceDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        Theme theme = Theme.valueOf(dto.getTheme().toUpperCase());
        workspaceService.updateWorkspaceAppearance(workspace, theme, dto.getAccentColor());
    }

    @Operation(summary = "Get a workspace photo", tags = "workspace-api")
    @GetMapping("/photo")
    public PhotoModel getWorkspacePhoto(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspaceId));
    }

    @Operation(summary = "Upload a new photo for workspace", tags = "workspace-api")
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadWorkspacePhoto(@RequestParam("ws_id") UUID workspaceId, MultipartFile photo) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        return photoService.savePhoto(generateWorkspacePhotoID(workspaceId), photo);
    }

    @Operation(summary = "Transfer ownership in workspace", tags = "workspace-api")
    @PostMapping(value = "/transfer", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void transferWorkspaceOwnership(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);

        String otherUserEmail = dto.getEmail();
        if (!userService.isUserExist(otherUserEmail))
            throw new ApiException("target_user_not_found", "There is no user registered with this email");

        workspaceService.transferOwnership(workspace, otherUserEmail);
    }

    @Operation(summary = "Get an invitation model", tags = "workspace-api")
    @GetMapping(value = "/invite")
    public WorkspaceInvitationModel getInvitation(@RequestParam("invite_id") UUID invitationId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        WorkspaceInvitation invitation = invitationService.getInvitation(userEmail, invitationId);

        String inviterUserEmail = invitation.getInviterUserEmail();
        User inviter = userService.findByEmail(inviterUserEmail).orElseThrow(() -> new ApiException(
                "inviter_not_found",
                "There is no user registered who sent an invitation to you"
        ));

        UUID workspaceId = invitation.getWorkspaceId();
        Workspace workspace = workspaceService.getWorkspace(workspaceId);
        PhotoModel workspacePhoto = photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspaceId));
        List<WorkspaceMember> members = workspaceService.getWorkspaceMembers(workspaceId);

        int membersCount = members.size();
        List<PhotoModel> memberPhotos = members.stream()
                .limit(3L)
                .map(WorkspaceMember::getUserEmail)
                .map(PhotoService::generateUserPhotoID)
                .map(photoService::getPhotoModelOrDefaultPicture)
                .toList();

        return WorkspaceInvitationModel.builder()
                .withId(invitationId)
                .withInviter(new Inviter(inviter.getName()))
                .withWorkspace(new DomainCardModel(workspaceId, workspace.getName(), workspacePhoto, membersCount, memberPhotos))
                .withExpiresAt(invitation.getExpiresAt())
                .build();
    }

    @Operation(summary = "Invite a user to workspace", tags = "workspace-api")
    @PostMapping(value = "/invite", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public WorkspaceInvitationModel inviteUserToWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid UserAddMemberDto dto) throws ApiException {
        User sender = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(sender.getEmail(), workspaceId);

        String recipientEmail = dto.getEmail();
        User recipient = userService.findByEmail(recipientEmail).orElseThrow(() -> new ApiException(
                "target_user_not_found",
                "There is no user registered with this email"
        ));

        WorkspaceInvitation invitation = invitationService.inviteToWorkspace(sender, recipient, workspace, dto.getRole());
        PhotoModel recipientPhoto = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(recipientEmail));

        return WorkspaceInvitationModel.builder()
                .withId(invitation.getId())
                .withRecipient(new Recipient(recipientEmail, recipient.getName(), recipientPhoto))
                .withExpiresAt(invitation.getExpiresAt())
                .build();
    }

    @Operation(summary = "Abort an invitation to workspace", tags = "workspace-api")
    @PostMapping(value = "/invite/abort")
    public void abortInvitation(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        invitationService.abortInvitation(workspace, dto.getEmail());
    }

    @Operation(summary = "Accept an invitation to workspace", tags = "workspace-api")
    @PostMapping(value = "/invite/accept")
    public WorkspaceMemberModel acceptInvitation(@RequestParam("invite_id") UUID invitationId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        WorkspaceInvitation invitation = invitationService.acceptInvitation(userEmail, invitationId);

        WorkspaceMember member = workspaceService.addToWorkspace(invitation.getWorkspaceId(), userEmail, invitation.getRole(), false);
        return WorkspaceMemberModel.fromWorkspaceMember(member, null, false);
    }

    @Operation(summary = "Decline an invitation to workspace", tags = "workspace-api")
    @PostMapping(value = "/invite/decline")
    @ResponseStatus(HttpStatus.OK)
    public void declineInvitation(@RequestParam("invite_id") UUID invitationId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        invitationService.declineInvitation(userEmail, invitationId);
    }

    @Operation(summary = "Kick a member from workspace", tags = "workspace-api")
    @PostMapping(value = "/members/kick", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void kickMemberFromWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        workspaceService.kickFromWorkspace(workspaceId, dto.getEmail());
    }

    @Operation(summary = "Leave from workspace", tags = "workspace-api")
    @PostMapping(value = "/leave")
    @ResponseStatus(HttpStatus.OK)
    public void leaveFromWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.leaveFromWorkspace(userEmail, workspaceId);
    }

    @Operation(summary = "Delete workspace", tags = "workspace-api")
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        workspaceService.requireWorkspaceAdminRights(user.getEmail(), workspaceId);
        workspaceService.deleteWorkspace(workspaceId);
    }

}
