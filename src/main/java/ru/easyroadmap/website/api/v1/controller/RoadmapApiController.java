package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.dto.roadmap.*;
import ru.easyroadmap.website.api.v1.model.PageableCollection;
import ru.easyroadmap.website.api.v1.model.roadmap.StageModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskModel;
import ru.easyroadmap.website.api.v1.service.FileUploadService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.RoadmapService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.FileUpload;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/roadmap")
@RequiredArgsConstructor
public class RoadmapApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final RoadmapService roadmapService;
    private final FileUploadService fileUploadService;

    @Value("${server.host}")
    private String serverHost;

    @Operation(summary = "Create a new roadmap stage", tags = "roadmap-api")
    @PostMapping(value = "/stage/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public StageModel createStage(@RequestParam("pr_id") UUID projectId, @Valid StageDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);
        return StageModel.fromStage(roadmapService.createStage(projectId, dto.getName()));
    }

    @Operation(summary = "Get a roadmap stage by ID", tags = "roadmap-api")
    @GetMapping("/stage")
    public StageModel getStage(@RequestParam("rms_id") long stageId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        return StageModel.fromStage(stage);
    }

    @Operation(summary = "Get a page of roadmap stages list", tags = "roadmap-api")
    @GetMapping("/stages")
    public ResponseEntity<PageableCollection<StageModel>> getStages(@RequestParam("pr_id") UUID projectId, @RequestParam(value = "p", defaultValue = "1") int page) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);

        Page<RoadmapStage> rawPage = roadmapService.getStagesPage(projectId, Math.max(page - 1, 0));
        if (rawPage.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(PageableCollection.fromPage(rawPage, StageModel::fromStage));
    }

    @Operation(summary = "Move a roadmap stage", tags = "roadmap-api")
    @PostMapping(value = "/stage/move", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void moveStage(@Valid MoveStageDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(dto.getStageId());
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        roadmapService.moveStage(stage, dto.getPosition());
    }

    @Operation(summary = "Set a stage name", tags = "roadmap-api")
    @PatchMapping(value = "/stage", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void setStageName(@RequestParam("rms_id") long stageId, @Valid StageDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        roadmapService.updateStageName(stage, dto.getName());
    }

    @Operation(summary = "Delete a stage", tags = "roadmap-api")
    @DeleteMapping("/stage")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStage(@RequestParam("rms_id") long stageId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        UUID projectId = roadmapService.requireStageProjectMembership(userEmail, stageId);
        roadmapService.deleteStage(projectId, stageId);
    }

    @Operation(summary = "Create a new roadmap task", tags = "roadmap-api")
    @PostMapping(value = "/task/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public TaskModel createTask(@RequestParam("rms_id") long stageId, @Valid TaskDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());

        RoadmapTask task = roadmapService.createTask(
                stageId, dto.getStatus(), dto.getName(), dto.getDescription(), dto.getDeadlineAt(), dto.getAttachment()
        );

        List<FileUpload> attachments = fileUploadService.getTaskAttachments(task.getId());
        if (attachments == null || attachments.isEmpty())
            return TaskModel.fromTask(task, null);

        List<TaskAttachmentModel> models = attachments.stream().map(a -> TaskAttachmentModel.fromFileUpload(serverHost, a)).toList();
        return TaskModel.fromTask(task, models);
    }

    @Operation(summary = "Get a roadmap task by ID", tags = "roadmap-api")
    @GetMapping("/task")
    public TaskModel getTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());

        List<FileUpload> attachments = fileUploadService.getTaskAttachments(task.getId());
        if (attachments == null || attachments.isEmpty())
            return TaskModel.fromTask(task, null);

        List<TaskAttachmentModel> models = attachments.stream().map(a -> TaskAttachmentModel.fromFileUpload(serverHost, a)).toList();
        return TaskModel.fromTask(task, models);
    }

    @Operation(summary = "Get a page of roadmap tasks list", tags = "roadmap-api")
    @GetMapping("/tasks")
    public ResponseEntity<PageableCollection<TaskModel>> getTasks(@RequestParam("rms_id") long stageId, @RequestParam(value = "p", defaultValue = "1") int page) throws ApiException {
        String userEmail = requireUserExistance(userService);
        UUID projectId = roadmapService.requireStageProjectMembership(userEmail, stageId);

        Page<RoadmapTask> rawPage = roadmapService.getTasksPage(stageId, Math.max(page - 1, 0));
        if (rawPage.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(PageableCollection.fromPage(rawPage, task -> {
            List<FileUpload> attachments = fileUploadService.getTaskAttachments(task.getId());
            if (attachments == null || attachments.isEmpty())
                return TaskModel.fromTask(task, null);

            List<TaskAttachmentModel> models = attachments.stream().map(a -> TaskAttachmentModel.fromFileUpload(serverHost, a)).toList();
            return TaskModel.fromTask(task, models);
        }));
    }

    @Operation(summary = "Set a task data", tags = "roadmap-api")
    @PutMapping(value = "/task", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putTaskData(@RequestParam("rmt_id") long taskId, @Valid TaskDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());

        roadmapService.updateTaskData(
                task, dto.getStatus(), dto.getName(), dto.getDescription(), dto.getDeadlineAt(), dto.getAttachment(),
                fileUploadService::deleteUploadedFiles
        );
    }

    @Operation(summary = "Delete a task", tags = "roadmap-api")
    @DeleteMapping("/task")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());
        roadmapService.deleteTask(taskId);
    }

    @Operation(summary = "Get a roadmap task attachment by ID", tags = "roadmap-api")
    @GetMapping("/task/attachment")
    public TaskAttachmentModel getTaskAttachment(@RequestParam("rmta_id") UUID attachmentId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        FileUpload fileUpload = fileUploadService.getFileUpload(attachmentId);

        RoadmapTaskAttachment attachment = roadmapService.getTaskAttachment(attachmentId);
        roadmapService.requireTaskProjectMembership(userEmail, attachment.getTaskId());

        return TaskAttachmentModel.fromFileUpload(serverHost, fileUpload);
    }

    @Operation(summary = "Get a list of roadmap task attachments", tags = "roadmap-api")
    @GetMapping("/task/attachments")
    public ResponseEntity<List<TaskAttachmentModel>> getTaskAttachments(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireTaskProjectMembership(userEmail, taskId);

        List<FileUpload> attachments = fileUploadService.getTaskAttachments(taskId);
        if (attachments.isEmpty())
            return ResponseEntity.noContent().build();

        List<TaskAttachmentModel> models = attachments.stream()
                .map(a -> TaskAttachmentModel.fromFileUpload(serverHost, a))
                .toList();

        return ResponseEntity.ok(models);
    }

    @Operation(summary = "Upload a task attachment", tags = "roadmap-api")
    @PostMapping(value = "/task/attachment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TaskAttachmentModel uploadTaskAttachment(@RequestParam("rms_id") long stageId, MultipartFile file) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireStageProjectMembership(userEmail, stageId);

        FileUpload fileUpload = fileUploadService.saveFile(file);
        return TaskAttachmentModel.fromFileUpload(serverHost, fileUpload);
    }

}
