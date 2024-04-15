package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.*;
import ru.easyroadmap.website.api.v1.model.*;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.model.workspace.Workspace.Theme;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.generateUserPhotoID;
import static ru.easyroadmap.website.api.v1.service.PhotoService.generateWorkspacePhotoID;

@RestController
@RequestMapping("/api/v1/workspace")
@RequiredArgsConstructor
public class WorkspaceApiController extends ApiControllerBase {

    private final UserService userService;
    private final WorkspaceService workspaceService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Create a new workspace", tags = "workspace-api")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public WorkspaceModel createWorkspace(@Valid CreateWorkspaceDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.createWorkspace(user, dto.getName(), dto.getDescription());
        workspaceService.joinToWorkspace(user, workspace.getId(), null, true);
        return WorkspaceModel.fromWorkspace(workspace, null, null, true);
    }

    @Operation(summary = "Get a workspace model", tags = "workspace-api")
    @GetMapping
    public WorkspaceModel getWorkspace(@RequestParam("wsid") UUID workspaceId) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(user, workspaceId);
        PhotoModel photoModel = photoService.getPhotoModel(generateWorkspacePhotoID(workspaceId)).orElse(null);
        return WorkspaceModel.fromWorkspace(workspace, photoModel, user.getEmail().equals(workspace.getAdminId()), true);
    }

    @Operation(summary = "Get a list of workspace members", tags = "workspace-api")
    @GetMapping("/members")
    public ResponseEntity<List<WorkspaceMemberModel>> getWorkspaceMembers(@RequestParam("wsid") UUID workspaceId) throws ApiException {
        User user = getCurrentUser(userService);
        List<WorkspaceMember> members = workspaceService.getWorkspaceMembers(user, workspaceId);
        String adminId = workspaceService.getWorkspace(workspaceId).getAdminId();
        boolean isAdmin = user.getEmail().equals(adminId);

        List<WorkspaceMemberModel> result = new ArrayList<>();
        for (WorkspaceMember member : members) {
            String memberEmail = member.getUserEmail();
            PhotoModel photoModel = photoService.getPhotoModel(generateUserPhotoID(memberEmail)).orElse(null);
            UserModel userModel = UserModel.fromUser(user, photoModel, isAdmin);
            result.add(WorkspaceMemberModel.fromWorkspaceMember(member, userModel, memberEmail.equals(adminId)));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a workspace info model", tags = "workspace-api")
    @GetMapping("/info")
    public WorkspaceInfoModel getWorkspaceInfo(@RequestParam("wsid") UUID workspaceId) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(user, workspaceId);
        return WorkspaceInfoModel.fromWorkspace(workspace);
    }

    @Operation(summary = "Set a workspace info", tags = "workspace-api")
    @PutMapping(value = "/info", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putWorkspaceInfo(@RequestParam("wsid") UUID workspaceId, @Valid PutWorkspaceInfoDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        workspaceService.updateWorkspaceInfo(user, workspaceId, dto.getName(), dto.getDescription());
    }

    @Operation(summary = "Get a workspace appearance model", tags = "workspace-api")
    @GetMapping("/appearance")
    public WorkspaceAppearanceModel getWorkspaceAppearance(@RequestParam("wsid") UUID workspaceId) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(user, workspaceId);
        return WorkspaceAppearanceModel.fromWorkspace(workspace);
    }

    @Operation(summary = "Set a workspace appearance", tags = "workspace-api")
    @PutMapping(value = "/appearance", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putWorkspaceAppearance(@RequestParam("wsid") UUID workspaceId, @Valid PutWorkspaceAppearanceDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        Theme theme = Theme.valueOf(dto.getTheme().toUpperCase());
        workspaceService.updateWorkspaceAppearance(user, workspaceId, theme, dto.getAccentColor());
    }

    @Operation(summary = "Get a workspace photo", tags = "workspace-api")
    @GetMapping("/photo")
    public ResponseEntity<PhotoModel> getWorkspacePhoto(@RequestParam("wsid") UUID workspaceId) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceMembership(user, workspaceId);
        PhotoModel photoModel = photoService.getPhotoModel(generateWorkspacePhotoID(workspace.getId())).orElse(null);
        return photoModel != null ? ResponseEntity.ok(photoModel) : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Upload a new photo for workspace", tags = "workspace-api")
    @PutMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadWorkspacePhoto(@RequestParam("wsid") UUID workspaceId, @Valid UploadPhotoDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(user, workspaceId);
        UUID uuid = generateWorkspacePhotoID(workspace.getId());
        return photoService.savePhoto(uuid, dto.getPhoto(), dto.getX(), dto.getY(), dto.getWidth(), dto.getHeight());
    }

    @Operation(summary = "Delete workspace", tags = "workspace-api")
    @DeleteMapping
    public WorkspaceModel deleteWorkspace(@RequestParam("wsid") UUID workspaceId, @Valid DeleteWorkspaceDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        Workspace workspace = workspaceService.requireWorkspaceAdminRights(user, workspaceId);

        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        if (!hashedPassword.equals(user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        workspaceService.deleteWorkspace(workspace);

        PhotoModel photoModel = photoService.getPhotoModel(generateWorkspacePhotoID(workspaceId)).orElse(null);
        return WorkspaceModel.fromWorkspace(workspace, photoModel, true, true);
    }

}