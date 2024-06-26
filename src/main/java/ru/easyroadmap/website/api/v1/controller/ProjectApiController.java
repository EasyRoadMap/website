package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.dto.ConfirmByPasswordDto;
import ru.easyroadmap.website.api.v1.dto.DomainMemberDto;
import ru.easyroadmap.website.api.v1.dto.UserIdentifierDto;
import ru.easyroadmap.website.api.v1.dto.UserIdentifierMultiDto;
import ru.easyroadmap.website.api.v1.dto.project.ProjectDataDto;
import ru.easyroadmap.website.api.v1.dto.project.ProjectLinksDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectLinkModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectMemberModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceMemberModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.docs.annotation.*;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.project.ProjectMember;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.generateProjectPhotoID;
import static ru.easyroadmap.website.api.v1.service.PhotoService.generateUserPhotoID;

@DescribeError(code = "ws_not_exists", userMessage = "Рабочая область не существует")
@DescribeError(code = "ws_ownership_required", userMessage = "Требуются права администратора")
@DescribeError(code = "pr_not_exists", userMessage = "Проект не существует")
@DescribeError(code = "pr_ownership_required", userMessage = "Требуются права администратора")
@DescribeError(code = "pr_membership_required", userMessage = "Вы не участник этого проекта")
@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final WorkspaceService workspaceService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Создание нового проекта", tags = "project-api")
    @SuccessResponse("Проект создан")
    @GenericErrorResponse({"ws_not_exists", "ws_ownership_required", "too_many_projects", "already_joined"})
    @DescribeError(code = "too_many_projects", userMessage = "Нельзя создать больше N проектов", payload = "N (лимит проектов на рабочую область)")
    @DescribeError(code = "already_joined", userMessage = "Вы уже состоите в проекте")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ProjectModel createProject(@RequestParam("ws_id") UUID workspaceId, @Valid ProjectDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);

        Project project = projectService.createProject(workspaceId, dto.getName(), dto.getDescription(), dto.getDeadlineAt());
        projectService.joinToProject(userEmail, project.getId());

        PhotoModel photo = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(project.getId()));
        return ProjectModel.fromProject(project, photo, null, null);
    }

    @Operation(summary = "Получение проекта по ID", tags = "project-api")
    @GenericErrorResponse({"pr_not_exists", "pr_membership_required"})
    @GetMapping
    public ProjectModel getProject(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectMembership(userEmail, projectId);
        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
        List<ProjectLink> links = projectService.getProjectLinks(projectId);
        return ProjectModel.fromProject(project, photoModel, links, () -> projectService.getTasksBasedProjectDeadline(projectId));
    }

    @Operation(summary = "Получение списка участников проекта", tags = "project-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"pr_not_exists", "pr_membership_required"})
    @GetMapping("/members")
    public ResponseEntity<List<ProjectMemberModel>> getProjectMembers(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectMembership(userEmail, projectId);

        List<ProjectMember> members = projectService.getProjectMembers(projectId);
        String adminId = projectService.getProjectWorkspaceAdminId(projectId).orElse(null);
        boolean isAdmin = userEmail.equals(adminId);

        List<ProjectMemberModel> result = new ArrayList<>();
        for (ProjectMember member : members) {
            String memberEmail = member.getUserEmail();
            Optional<User> user = userService.findByEmail(memberEmail);
            if (user.isEmpty())
                continue;

            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(memberEmail));
            UserModel userModel = UserModel.fromUser(user.get(), photoModel, isAdmin);
            result.add(ProjectMemberModel.fromProjectMember(member, userModel));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Получение информации о проекте", tags = "project-api")
    @GenericErrorResponse({"pr_not_exists", "pr_membership_required"})
    @GetMapping("/info")
    public ProjectInfoModel getProjectInfo(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectMembership(userEmail, projectId);
        return project.createInfoModel(() -> projectService.getTasksBasedProjectDeadline(projectId));
    }

    @Operation(summary = "Изменение информации о проекте", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Информация о проекте изменена")
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required"})
    @PutMapping(value = "/info", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void putProjectInfo(@RequestParam("pr_id") UUID projectId, @Valid ProjectDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.updateProjectInfo(project, dto.getName(), dto.getDescription(), dto.getDeadlineAt());
    }

    @Operation(summary = "Получение ссылок в проекте", tags = "project-api")
    @GenericErrorResponse({"pr_not_exists", "pr_membership_required"})
    @GetMapping("/links")
    public ResponseEntity<List<ProjectLinkModel>> getProjectLinks(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);

        List<ProjectLink> links = projectService.getProjectLinks(projectId);
        List<ProjectLinkModel> result = ProjectLinkModel.fromLinks(links);

        return result == null || result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Изменение ссылок в проекте", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Ссылки в проекте изменены")
    @GenericErrorResponse({"bad_links", "pr_not_exists", "pr_ownership_required"})
    @DescribeError(code = "bad_links", userMessage = "Ссылки переданы неверно")
    @PutMapping(value = "/links", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void putProjectLinks(@RequestParam("pr_id") UUID projectId, @Valid ProjectLinksDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<ProjectLinksDto.LinkFacade> links = dto.collect();

        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.updateProjectLinks(projectId, links);
    }

    @Operation(summary = "Получение аватарки проекта", tags = "project-api")
    @GenericErrorResponse({"pr_not_exists", "pr_membership_required"})
    @GetMapping("/photo")
    public PhotoModel getProjectPhoto(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);
        return photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
    }

    @Operation(summary = "Изменение аватарки проекта", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Аватарка проекта изменена")
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required", "too_small_image", "too_large_image", "bad_image_ratio", "bad_image"})
    @DescribeError(code = "too_small_image", userMessage = "Слишком маленькое изображение", payload = "WxH (минимальные размеры)")
    @DescribeError(code = "too_large_image", userMessage = "Слишком большое изображение", payload = "WxH (максимальные размеры)")
    @DescribeError(code = "bad_image_ratio", userMessage = "Изображение должно быть квадратным")
    @DescribeError(code = "bad_image", userMessage = "Неподдерживаемое изображение")
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadProjectPhoto(@RequestParam("pr_id") UUID projectId, MultipartFile photo) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        UUID uuid = generateProjectPhotoID(projectId);
        return photoService.savePhoto(uuid, photo);
    }

    @Operation(summary = "Получение списка доступных для добавления пользователей", tags = "project-api", description = "Вернет список участников рабочей области, которых можно добавить в этот проект.")
    @WorkspaceAdminOperation
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required"})
    @GetMapping(value = "/members/attachable")
    public ResponseEntity<List<WorkspaceMemberModel>> getAttachableWorkspaceMembers(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        List<WorkspaceMemberModel> result = new ArrayList<>();
        for (WorkspaceMember member : projectService.getAttachableMembers(project.getWorkspaceId(), projectId)) {
            String memberEmail = member.getUserEmail();
            Optional<User> user = userService.findByEmail(memberEmail);
            if (user.isEmpty())
                continue;

            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(memberEmail));
            UserModel userModel = UserModel.fromUser(user.get(), photoModel, true);
            result.add(WorkspaceMemberModel.fromWorkspaceMember(member, userModel, null));
        }

        return result == null || result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Добавление пользовател(я/ей) в проект", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Пользовател(ь/и) добавлен(ы) в проект")
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required", "user_cannot_be_added", "user_already_joined"})
    @DescribeError(code = "user_cannot_be_added", userMessage = "Пользователь не может быть добавлен", payload = "email (почта пользователя)")
    @DescribeError(code = "user_already_joined", userMessage = "Пользователь уже добавлен в проект", payload = "email (почта пользователя)")
    @PostMapping(value = "/members/add", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void addMemberToProject(@RequestParam("pr_id") UUID projectId, @Valid UserIdentifierMultiDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        String[] emails = dto.getEmail();
        UUID workspaceId = project.getWorkspaceId();

        for (String email : emails) {
            if (workspaceService.isAdmin(email, workspaceId)) {
                throw new ApiException("user_cannot_be_added", "Requested user is an admin of this workspace").withPayload(email);
            }

            if (!workspaceService.isMember(email, workspaceId)) {
                throw new ApiException("user_cannot_be_added", "Requested user isn't a member of this workspace").withPayload(email);
            }
        }

        String[] roles = new String[emails.length];
        for (int i = 0; i < emails.length; i++)
            roles[i] = workspaceService.getMemberRole(emails[i], workspaceId);

        projectService.addToProject(projectId, emails, roles);
    }

    @Operation(summary = "Исключение пользователя из проекта", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Пользователь исключен из проекта")
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required", "user_cannot_be_removed", "user_not_a_member"})
    @DescribeError(code = "user_cannot_be_removed", userMessage = "Пользователь не может быть исключен")
    @DescribeError(code = "user_not_a_member", userMessage = "Пользователь не является участником проекта")
    @PostMapping(value = "/members/remove", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void removeMemberFromProject(@RequestParam("pr_id") UUID projectId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        String otherUserEmail = dto.getEmail();
        UUID workspaceId = project.getWorkspaceId();

        if (workspaceService.isAdmin(otherUserEmail, workspaceId))
            throw new ApiException("user_cannot_be_removed", "Requested user is an admin of this workspace");

        if (!workspaceService.isMember(otherUserEmail, workspaceId))
            throw new ApiException("user_cannot_be_removed", "Requested user isn't a member of this workspace");

        projectService.kickFromProject(projectId, otherUserEmail);
    }

    @Operation(summary = "Изменение должности участника проекта", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Должность участника проекта изменена")
    @GenericErrorResponse({"pr_not_exists", "pr_ownership_required", "user_not_a_member"})
    @DescribeError(code = "user_not_a_member", userMessage = "Пользователь не является участником проекта")
    @PatchMapping(value = "/members/role", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void changeMemberRole(@RequestParam("pr_id") UUID projectId, @Valid DomainMemberDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.changeMemberRole(projectId, dto.getEmail(), dto.getRole());
    }

    @Operation(summary = "Удаление проекта", tags = "project-api")
    @WorkspaceAdminOperation
    @SuccessResponse("Проект удален")
    @GenericErrorResponse({"wrong_password", "pr_not_exists", "pr_ownership_required"})
    @DescribeError(code = "wrong_password", userMessage = "Неверный пароль")
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void deleteProject(@RequestParam("pr_id") UUID projectId, @Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        projectService.requireProjectWorkspaceAdminRights(user.getEmail(), projectId);
        projectService.deleteProject(projectId);
    }

}
