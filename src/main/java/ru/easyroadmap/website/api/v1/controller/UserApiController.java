package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.ConfirmByPasswordDto;
import ru.easyroadmap.website.api.v1.dto.user.PutUserProfileDto;
import ru.easyroadmap.website.api.v1.dto.UploadPhotoDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectModel;
import ru.easyroadmap.website.api.v1.model.workspace.WorkspaceModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final WorkspaceService workspaceService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Get a current user", tags = "user-api")
    @GetMapping
    public UserModel getUser() throws ApiException {
        User user = getCurrentUser(userService);
        PhotoModel photoModel = photoService.getPhotoModel(generateUserPhotoID(user.getEmail())).orElse(null);
        return UserModel.fromUser(user, photoModel, true);
    }

    @Operation(summary = "Update an user profile", tags = "user-api")
    @PutMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putUserProfile(@Valid PutUserProfileDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        userService.updateUserName(user, dto.getName());
    }

    @Operation(summary = "Get a list of joined workspaces", tags = "user-api")
    @GetMapping("/workspaces")
    public ResponseEntity<List<WorkspaceModel>> getJoinedWorkspaces() throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<Workspace> joinedWorkspaces = workspaceService.getJoinedWorkspaces(userEmail);

        List<WorkspaceModel> result = new ArrayList<>();
        for (Workspace workspace : joinedWorkspaces) {
            PhotoModel photoModel = photoService.getPhotoModel(generateWorkspacePhotoID(workspace.getId())).orElse(null);
            boolean isAdmin = userEmail.equals(workspace.getAdminId());
            result.add(WorkspaceModel.fromWorkspace(workspace, photoModel, isAdmin, false));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a list of joined projects in workspace", tags = "user-api")
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectModel>> getJoinedProjects(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<Project> joinedProjects = projectService.getJoinedProjects(userEmail, workspaceId);

        List<ProjectModel> result = new ArrayList<>();
        for (Project project : joinedProjects) {
            PhotoModel photoModel = photoService.getPhotoModel(generateProjectPhotoID(project.getId())).orElse(null);
            List<ProjectLink> links = projectService.getProjectLinks(project.getId());
            result.add(ProjectModel.fromProject(project, photoModel, links));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a current user photo", tags = "user-api")
    @GetMapping("/photo")
    public ResponseEntity<PhotoModel> getUserPhoto() throws ApiException {
        String userEmail = requireUserExistance(userService);
        PhotoModel photoModel = photoService.getPhotoModel(generateUserPhotoID(userEmail)).orElse(null);
        return photoModel != null ? ResponseEntity.ok(photoModel) : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Upload a new photo for current user", tags = "user-api")
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadUserPhoto(@Valid UploadPhotoDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        UUID uuid = generateUserPhotoID(userEmail);
        return photoService.savePhoto(uuid, dto.getPhoto(), dto.getX(), dto.getY(), dto.getWidth(), dto.getHeight());
    }

    @Operation(summary = "Delete current user", tags = "user-api")
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        if (!hashedPassword.equals(user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        List<Workspace> joinedWorkspaces = workspaceService.getJoinedWorkspaces(user.getEmail());
        if (!joinedWorkspaces.isEmpty())
            throw new ApiException("have_joined_workspace", "You still have least one joined workspace");

        userService.deleteUser(user);
    }

}
