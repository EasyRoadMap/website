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
import ru.easyroadmap.website.api.v1.dto.project.ProjectDataDto;
import ru.easyroadmap.website.api.v1.dto.project.ProjectLinksDto;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.UserModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectLinkModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectMemberModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectModel;
import ru.easyroadmap.website.api.v1.service.PhotoService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.api.v1.service.WorkspaceService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.project.ProjectMember;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static ru.easyroadmap.website.api.v1.service.PhotoService.generateProjectPhotoID;
import static ru.easyroadmap.website.api.v1.service.PhotoService.generateUserPhotoID;

@RestController
@RequestMapping("/api/v1/project")
@RequiredArgsConstructor
public class ProjectApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final WorkspaceService workspaceService;
    private final PhotoService photoService;

    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Create a new project", tags = "project-api")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ProjectModel createProject(@RequestParam("ws_id") UUID workspaceId, @Valid ProjectDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        workspaceService.requireWorkspaceAdminRights(userEmail, workspaceId);

        Project project = projectService.createProject(workspaceId, dto.getName(), dto.getDescription(), dto.getDeadlineAt());
        projectService.joinToProject(userEmail, project.getId());

        PhotoModel photo = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(project.getId()));
        return ProjectModel.fromProject(project, photo, null, null);
    }

    @Operation(summary = "Get a project model", tags = "project-api")
    @GetMapping
    public ProjectModel getProject(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectMembership(userEmail, projectId);
        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
        List<ProjectLink> links = projectService.getProjectLinks(projectId);
        return ProjectModel.fromProject(project, photoModel, links, () -> projectService.getTasksBasedProjectDeadline(projectId));
    }

    @Operation(summary = "Get a list of project members", tags = "project-api")
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

    @Operation(summary = "Get a project info model", tags = "project-api")
    @GetMapping("/info")
    public ProjectInfoModel getProjectInfo(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectMembership(userEmail, projectId);
        return project.createInfoModel(() -> projectService.getTasksBasedProjectDeadline(projectId));
    }

    @Operation(summary = "Set a project info", tags = "project-api")
    @PutMapping(value = "/info", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putProjectInfo(@RequestParam("pr_id") UUID projectId, @Valid ProjectDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.updateProjectInfo(project, dto.getName(), dto.getDescription(), dto.getDeadlineAt());
    }

    @Operation(summary = "Get project links", tags = "project-api")
    @GetMapping("/links")
    public ResponseEntity<List<ProjectLinkModel>> getProjectLinks(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);

        List<ProjectLink> links = projectService.getProjectLinks(projectId);
        List<ProjectLinkModel> result = ProjectLinkModel.fromLinks(links);

        return result == null || result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

    @Operation(summary = "Set project links", tags = "project-api")
    @PutMapping(value = "/links", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putProjectLinks(@RequestParam("pr_id") UUID projectId, @Valid ProjectLinksDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        List<ProjectLinksDto.LinkFacade> links = dto.collect();

        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.updateProjectLinks(projectId, links);
    }

    @Operation(summary = "Get a project photo", tags = "project-api")
    @GetMapping("/photo")
    public PhotoModel getProjectPhoto(@RequestParam("pr_id") UUID projectId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);
        return photoService.getPhotoModelOrDefaultPicture(generateProjectPhotoID(projectId));
    }

    @Operation(summary = "Upload a new photo for project", tags = "project-api")
    @PostMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoModel uploadProjectPhoto(@RequestParam("pr_id") UUID projectId, MultipartFile photo) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        UUID uuid = generateProjectPhotoID(projectId);
        return photoService.savePhoto(uuid, photo);
    }

    @Operation(summary = "Add workspace member to project", tags = "project-api")
    @PostMapping(value = "/members/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addMemberToProject(@RequestParam("pr_id") UUID projectId, @Valid DomainMemberDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        String otherUserEmail = dto.getEmail();
        UUID workspaceId = project.getWorkspaceId();

        if (workspaceService.isAdmin(otherUserEmail, workspaceId))
            throw new ApiException("user_is_admin", "Requested user is an admin of this workspace");

        if (!workspaceService.isMember(otherUserEmail, workspaceId))
            throw new ApiException("not_a_member", "Requested user isn't a member of this workspace");

        projectService.addToProject(projectId, dto.getEmail(), dto.getRole());
    }

    @Operation(summary = "Remove workspace member from project", tags = "project-api")
    @PostMapping(value = "/members/remove", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void removeMemberFromProject(@RequestParam("pr_id") UUID projectId, @Valid UserIdentifierDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        Project project = projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);

        String otherUserEmail = dto.getEmail();
        UUID workspaceId = project.getWorkspaceId();

        if (workspaceService.isAdmin(otherUserEmail, workspaceId))
            throw new ApiException("user_is_admin", "Requested user is an admin of this workspace");

        if (!workspaceService.isMember(otherUserEmail, workspaceId))
            throw new ApiException("not_a_member", "Requested user isn't a member of this workspace");

        projectService.kickFromProject(projectId, otherUserEmail);
    }

    @Operation(summary = "Change role of a project member", tags = "project-api")
    @PatchMapping(value = "/members/role", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void changeMemberRole(@RequestParam("pr_id") UUID projectId, @Valid DomainMemberDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectWorkspaceAdminRights(userEmail, projectId);
        projectService.changeMemberRole(projectId, dto.getEmail(), dto.getRole());
    }

    @Operation(summary = "Delete project", tags = "project-api")
    @DeleteMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteProject(@RequestParam("pr_id") UUID projectId, @Valid ConfirmByPasswordDto dto) throws ApiException {
        User user = getCurrentUser(userService);
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            throw new ApiException("wrong_password", "Password isn't correct");

        projectService.requireProjectWorkspaceAdminRights(user.getEmail(), projectId);
        projectService.deleteProject(projectId);
    }

}
