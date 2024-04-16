package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.DeleteUserDto;
import ru.easyroadmap.website.api.v1.dto.PutUserProfileDto;
import ru.easyroadmap.website.api.v1.dto.UploadPhotoDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.WorkspaceModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.generateUserPhotoID;
import static ru.easyroadmap.website.api.v1.service.PhotoService.generateWorkspacePhotoID;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserApiController extends ApiControllerBase {

    private final UserService userService;
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
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(PutUserProfileDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        userService.updateUserName(user, dto.getName());
    }

    @Operation(summary = "Get a list of joined workspaces", tags = "user-api")
    @GetMapping("/workspaces")
    public ResponseEntity<List<WorkspaceModel>> getJoinedWorkspaces() throws ApiException {
        User user = getCurrentUser(userService);
        List<Workspace> joinedWorkspaces = workspaceService.getJoinedWorkspaces(user);

        List<WorkspaceModel> result = new ArrayList<>();
        for (Workspace workspace : joinedWorkspaces) {
            PhotoModel photoModel = photoService.getPhotoModel(generateWorkspacePhotoID(workspace.getId())).orElse(null);
            boolean isAdmin = user.getEmail().equals(workspace.getAdminId());
            result.add(WorkspaceModel.fromWorkspace(workspace, photoModel, isAdmin, false));
        }

        return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Get a current user photo", tags = "user-api")
    @GetMapping("/photo")
    public ResponseEntity<PhotoModel> getUserPhoto() throws ApiException {
        User user = getCurrentUser(userService);
        PhotoModel photoModel = photoService.getPhotoModel(generateUserPhotoID(user.getEmail())).orElse(null);
        return photoModel != null ? ResponseEntity.ok(photoModel) : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Upload a new photo for current user", tags = "user-api")
    @PutMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadUserPhoto(@Valid UploadPhotoDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        UUID uuid = generateUserPhotoID(user.getEmail());
        return photoService.savePhoto(uuid, dto.getPhoto(), dto.getX(), dto.getY(), dto.getWidth(), dto.getHeight());
    }

    @Operation(summary = "Delete current user", tags = "user-api")
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@Valid DeleteUserDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        if (!hashedPassword.equals(user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        userService.deleteUser(user);
    }

}
