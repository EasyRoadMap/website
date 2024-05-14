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
import ru.easyroadmap.website.api.v1.dto.DomainMemberDto;
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
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
import ru.easyroadmap.website.docs.annotation.WorkspaceAdminOperation;
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

    @Operation(summary = "Создание новой рабочей области", tags = "workspace-api")
    @GenericErrorResponse({"!too_many_joined_workspaces", "already_joined"})
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public WorkspaceModel createWorkspace(@Valid WorkspaceDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.createWorkspace(userEmail, dto.getName(), dto.getDescription());
        workspaceService.joinToWorkspace(userEmail, workspace.getId());

        PhotoModel photo = photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspace.getId()));
        return WorkspaceModel.fromWorkspace(workspace, photo, true, true);
    }

    @Operation(summary = "Получение рабочей области по ID", tags = "workspace-api")
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
    @GetMapping
    public WorkspaceModel getWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspaceId));
        return WorkspaceModel.fromWorkspace(workspace, photoModel, userEmail.equals(workspace.getAdminId()), true);
    }

    @Operation(summary = "Получение списка проектов в рабочей области", tags = "workspace-api", description = "Если пользователь не администратор этой области, он получит только те проекты, в которых он состоит")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
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

    @Operation(summary = "Получение списка участников рабочей области", tags = "workspace-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
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

    @Operation(summary = "Получение информации о рабочей области", tags = "workspace-api")
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
    @GetMapping("/info")
    public WorkspaceInfoModel getWorkspaceInfo(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return workspace.createInfoModel();
    }

    @Operation(summary = "Изменение информации о рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Информация о рабочей области изменена")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights"})
    @PutMapping(value = "/info", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void putWorkspaceInfo(@RequestParam("ws_id") UUID workspaceId, @Valid WorkspaceDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        workspaceService.updateWorkspaceInfo(workspace, dto.getName(), dto.getDescription());
    }

    @Operation(summary = "Получение оформления рабочей области", tags = "workspace-api")
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
    @GetMapping("/appearance")
    public WorkspaceAppearanceModel getWorkspaceAppearance(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return workspace.createAppearanceModel();
    }

    @Operation(summary = "Изменение оформления рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Оформление рабочей области изменена")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights"})
    @PutMapping(value = "/appearance", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void putWorkspaceAppearance(@RequestParam("ws_id") UUID workspaceId, @Valid WorkspaceAppearanceDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        Theme theme = Theme.valueOf(dto.getTheme().toUpperCase());
        workspaceService.updateWorkspaceAppearance(workspace, theme, dto.getAccentColor());
    }

    @Operation(summary = "Получение аватарки рабочей области", tags = "workspace-api")
    @GenericErrorResponse({"workspace_not_exists", "not_a_member"})
    @GetMapping("/photo")
    public PhotoModel getWorkspacePhoto(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceMembership(userEmail, workspaceId);
        return photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspaceId));
    }

    @Operation(summary = "Изменение аватарки рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Аватарка рабочей области изменена")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "!too_small_image", "!too_large_image", "!bad_image_ratio", "bad_image"})
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadWorkspacePhoto(@RequestParam("ws_id") UUID workspaceId, MultipartFile photo) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        return photoService.savePhoto(generateWorkspacePhotoID(workspaceId), photo);
    }

    @Operation(summary = "Передача управления рабочей областью", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Управление рабочей областью передано")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "!target_not_found", "!target_not_a_member"})
    @PostMapping(value = "/transfer", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void transferWorkspaceOwnership(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);

        String otherUserEmail = dto.getEmail();
        if (!userService.isUserExist(otherUserEmail))
            throw new ApiException("target_not_found", "There is no user registered with this email");

        workspaceService.transferOwnership(workspace, otherUserEmail);
    }

    @Operation(summary = "Изменение должности участника рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Должность участника рабочей области изменена")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "target_not_a_member"})
    @PatchMapping(value = "/members/role", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void changeMemberRole(@RequestParam("ws_id") UUID workspaceId, @Valid DomainMemberDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        workspaceService.changeMemberRole(workspaceId, dto.getEmail(), dto.getRole());
    }

    @Operation(summary = "Получение приглашения по ID", tags = "workspace-api")
    @GenericErrorResponse({"!invitation_not_found", "invitation_not_yours", "!workspace_not_found", "!invitation_expired", "!inviter_not_admin", "!already_joined", "!inviter_not_found"})
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

    @Operation(summary = "Приглашение пользователя в рабочую область", tags = "workspace-api")
    @WorkspaceAdminOperation
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "!target_not_found", "!workspace_is_full", "!user_already_invited"})
    @PostMapping(value = "/invite", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public WorkspaceInvitationModel inviteUserToWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid DomainMemberDto dto) throws ApiException {
        User sender = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(sender.getEmail(), workspaceId);

        String recipientEmail = dto.getEmail();
        User recipient = userService.findByEmail(recipientEmail).orElseThrow(() -> new ApiException(
                "target_not_found",
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

    @Operation(summary = "Отмена приглашения в рабочую область", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Приглашение в рабочую область отменено")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "invitation_not_found", "workspace_not_found", "invitation_expired"})
    @PostMapping(value = "/invite/abort", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void abortInvitation(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        invitationService.abortInvitation(workspace, dto.getEmail());
    }

    @Operation(summary = "Принятие приглашения в рабочую область", tags = "workspace-api")
    @GenericErrorResponse({"!invitation_not_found", "invitation_not_yours", "!workspace_not_found", "!invitation_expired", "!inviter_not_admin", "!already_joined", "!too_many_joined_workspaces", "!workspace_members_limit_exceeded"})
    @PostMapping(value = "/invite/accept")
    public WorkspaceMemberModel acceptInvitation(@RequestParam("invite_id") UUID invitationId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        WorkspaceInvitation invitation = invitationService.acceptInvitation(userEmail, invitationId);

        WorkspaceMember member = workspaceService.addToWorkspace(invitation.getWorkspaceId(), userEmail, invitation.getRole(), false);
        return WorkspaceMemberModel.fromWorkspaceMember(member, null, false);
    }

    @Operation(summary = "Отклонение приглашения в рабочую область", tags = "workspace-api")
    @SuccessResponse("Приглашение в рабочую область отклонено")
    @GenericErrorResponse({"!invitation_not_found", "invitation_not_yours", "!workspace_not_found", "!invitation_expired", "!inviter_not_admin", "!already_joined"})
    @PostMapping(value = "/invite/decline")
    public void declineInvitation(@RequestParam("invite_id") UUID invitationId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        invitationService.declineInvitation(userEmail, invitationId);
    }

    @Operation(summary = "Исключение пользователя из рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Пользователь исключен из рабочей области")
    @GenericErrorResponse({"workspace_not_exists", "!not_enough_rights", "!target_is_admin", "!target_not_a_member"})
    @PostMapping(value = "/members/kick", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void kickMemberFromWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);
        workspaceService.kickFromWorkspace(workspaceId, dto.getEmail());
    }

    @Operation(summary = "Выход из рабочей области", tags = "workspace-api")
    @SuccessResponse("Совершен выход из рабочей области")
    @GenericErrorResponse({"!user_is_admin", "not_a_member"})
    @PostMapping(value = "/leave")
    public void leaveFromWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.leaveFromWorkspace(userEmail, workspaceId);
    }

    @Operation(summary = "Удаление рабочей области", tags = "workspace-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Рабочая область удалена")
    @GenericErrorResponse({"!wrong_password", "workspace_not_exists", "!not_enough_rights"})
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void deleteWorkspace(@RequestParam("ws_id") UUID workspaceId, @Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        workspaceService.requireWorkspaceAdminRights(user.getEmail(), workspaceId);
        workspaceService.deleteWorkspace(workspaceId);
    }

}
