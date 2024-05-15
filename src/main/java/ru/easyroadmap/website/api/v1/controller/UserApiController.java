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
import ru.easyroadmap.website.api.v1.dto.user.ChangePasswordDto;
import ru.easyroadmap.website.api.v1.dto.user.UserDataDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.docs.annotation.DescribeError;
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.*;

@DescribeError(code = "no_current_user", userMessage = "Текущий пользователь не задан")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final WorkspaceService workspaceService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Получение пользователя", tags = "user-api")
    @GenericErrorResponse("no_current_user")
    @GetMapping
    public UserModel getUser() throws ApiException {
        User user = getCurrentUser(userService);
        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(user.getEmail()));
        return UserModel.fromUser(user, photoModel, true);
    }

    @Operation(summary = "Изменение имени пользователя", tags = "user-api")
    @SuccessResponse("Имя пользователя изменено")
    @GenericErrorResponse("no_current_user")
    @PatchMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void setUserName(@Valid UserDataDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        userService.updateUserName(user, dto.getName());
    }

    @Operation(summary = "Изменение пароля пользователя", tags = "user-api")
    @SuccessResponse("Пароль пользователя изменен")
    @GenericErrorResponse({"no_current_user", "wrong_password"})
    @DescribeError(code = "wrong_password", userMessage = "Неверный пароль", forUser = true)
    @PutMapping(value = "/password", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void changePassword(@Valid ChangePasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        userService.updateUserPassword(user, dto.getNewPassword());
    }

    @Operation(summary = "Получение списка рабочих областей", tags = "user-api", description = "Вернет список рабочих областей, в которых состоит текущий пользователь.")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse("no_current_user")
    @GetMapping("/workspaces")
    public ResponseEntity<List<WorkspaceModel>> getJoinedWorkspaces() throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<Workspace> joinedWorkspaces = workspaceService.getJoinedWorkspaces(userEmail);

        List<WorkspaceModel> result = new ArrayList<>();
        for (Workspace workspace : joinedWorkspaces) {
            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateWorkspacePhotoID(workspace.getId()));
            boolean isAdmin = userEmail.equals(workspace.getAdminId());
            result.add(WorkspaceModel.fromWorkspace(workspace, photoModel, isAdmin, false));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Получение списка проектов", tags = "user-api", description = "Вернет список проектов рабочей области, в которых состоит текущий пользователь.")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse("no_current_user")
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectModel>> getJoinedProjects(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<Project> joinedProjects = projectService.getJoinedProjects(userEmail, workspaceId);

        List<ProjectModel> result = new ArrayList<>();
        for (Project project : joinedProjects) {
            UUID projectId = project.getId();
            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
            List<ProjectLink> links = projectService.getProjectLinks(projectId);
            result.add(ProjectModel.fromProject(project, photoModel, links, () -> projectService.getTasksBasedProjectDeadline(projectId)));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Получение аватарки пользователя", tags = "user-api")
    @GenericErrorResponse("no_current_user")
    @GetMapping("/photo")
    public PhotoModel getUserPhoto() throws ApiException {
        String userEmail = requireUserExistance(userService);
        return photoService.getPhotoModelOrDefaultPicture(generateUserPhotoID(userEmail));
    }

    @Operation(summary = "Изменение аватарки пользователя", tags = "user-api")
    @SuccessResponse("Аватарка пользователя изменена")
    @GenericErrorResponse({"no_current_user", "too_small_image", "too_large_image", "bad_image_ratio", "bad_image"})
    @DescribeError(code = "too_small_image", userMessage = "Слишком маленькое изображение", forUser = true, payload = "WxH (минимальные размеры)")
    @DescribeError(code = "too_large_image", userMessage = "Слишком большое изображение", forUser = true, payload = "WxH (максимальные размеры)")
    @DescribeError(code = "bad_image_ratio", userMessage = "Изображение должно быть квадратным")
    @DescribeError(code = "bad_image", userMessage = "Неподдерживаемое изображение")
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadUserPhoto(MultipartFile photo) throws ApiException {
        String userEmail = requireUserExistance(userService);
        return photoService.savePhoto(generateUserPhotoID(userEmail), photo);
    }

    @Operation(summary = "Удаление пользователя", tags = "user-api")
    @SuccessResponse("Пользователь удален")
    @GenericErrorResponse({"no_current_user", "wrong_password", "have_joined_workspace"})
    @DescribeError(code = "wrong_password", userMessage = "Неверный пароль", forUser = true)
    @DescribeError(code = "have_joined_workspace", userMessage = "Вы ещё состоите в минимум одной рабочей области", forUser = true)
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void deleteUser(@Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        List<Workspace> joinedWorkspaces = workspaceService.getJoinedWorkspaces(user.getEmail());
        if (!joinedWorkspaces.isEmpty())
            throw new ApiException("have_joined_workspace", "You still have least one joined workspace");

        userService.deleteUser(user);
    }

}
