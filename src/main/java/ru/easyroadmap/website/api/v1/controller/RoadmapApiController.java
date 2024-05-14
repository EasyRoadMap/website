package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.api.v1.dto.roadmap.MoveStageDto;
import ru.easyroadmap.website.api.v1.dto.roadmap.StageDataDto;
import ru.easyroadmap.website.api.v1.dto.roadmap.TaskDataDto;
import ru.easyroadmap.website.api.v1.model.PageableCollection;
import ru.easyroadmap.website.api.v1.model.roadmap.StageModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskModel;
import ru.easyroadmap.website.api.v1.service.FileUploadService;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.RoadmapService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
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

    @Operation(summary = "Создание нового этапа", tags = "roadmap-api")
    @SuccessResponse("Новый этап создан")
    @GenericErrorResponse({"!project_not_exists", "!not_a_member", "!too_many_stages"})
    @PostMapping(value = "/stage/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public StageModel createStage(@RequestParam("pr_id") UUID projectId, @Valid StageDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);
        return roadmapService.createStage(projectId, dto.getName()).createModel();
    }

    @Operation(summary = "Получение этапа по ID", tags = "roadmap-api")
    @GenericErrorResponse({"!roadmap_stage_not_found", "!project_not_exists", "!not_a_member"})
    @GetMapping("/stage")
    public StageModel getStage(@RequestParam("rms_id") long stageId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        return stage.createModel(roadmapService.hasInProgressTask(stageId));
    }

    @Operation(summary = "Получение страницы списка этапов", tags = "roadmap-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"!project_not_exists", "!not_a_member"})
    @GetMapping("/stages")
    public ResponseEntity<PageableCollection<StageModel>> getStages(@RequestParam("pr_id") UUID projectId, @RequestParam(value = "p", defaultValue = "1") int page) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);

        Page<RoadmapStage> rawPage = roadmapService.getStagesPage(projectId, Math.max(page - 1, 0));
        if (rawPage.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(PageableCollection.fromPage(rawPage, s -> s.createModel(roadmapService.hasInProgressTask(s.getId()))));
    }

    @Operation(summary = "Перемещение этапа на карте", tags = "roadmap-api")
    @SuccessResponse("Этап на карте перемещен")
    @GenericErrorResponse({"!roadmap_stage_not_found", "!project_not_exists", "!not_a_member", "!position_out_of_bounds"})
    @PostMapping(value = "/stage/move", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void moveStage(@Valid MoveStageDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(dto.getStageId());
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        roadmapService.moveStage(stage, dto.getPosition());
    }

    @Operation(summary = "Изменение названия этапа", tags = "roadmap-api")
    @SuccessResponse("Название этапа изменено")
    @GenericErrorResponse({"!roadmap_stage_not_found", "!project_not_exists", "!not_a_member"})
    @PatchMapping(value = "/stage", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void setStageName(@RequestParam("rms_id") long stageId, @Valid StageDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        roadmapService.updateStageName(stage, dto.getName());
    }

    @Operation(summary = "Удаление этапа", tags = "roadmap-api")
    @SuccessResponse("Этап удалена")
    @GenericErrorResponse({"!project_not_found", "!not_a_member"})
    @DeleteMapping("/stage")
    public void deleteStage(@RequestParam("rms_id") long stageId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        UUID projectId = roadmapService.requireStageProjectMembership(userEmail, stageId);
        roadmapService.deleteStage(projectId, stageId);
    }

    @Operation(summary = "Создание новой задачи", tags = "roadmap-api")
    @SuccessResponse("Новая задача создана")
    @GenericErrorResponse({"!roadmap_stage_not_found", "!project_not_exists", "!not_a_member", "!too_many_tasks", "roadmap_task_attachment_not_found"})
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
            return task.createModel(null);

        List<TaskAttachmentModel> attachmentModels = attachments.stream().map(a -> a.createTaskAttachmentModel(serverHost)).toList();
        return task.createModel(attachmentModels);
    }

    @Operation(summary = "Получение задачи по ID", tags = "roadmap-api")
    @GenericErrorResponse({"!roadmap_task_not_found", "!project_not_found", "!not_a_member"})
    @GetMapping("/task")
    public TaskModel getTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());

        List<FileUpload> attachments = fileUploadService.getTaskAttachments(task.getId());
        if (attachments == null || attachments.isEmpty())
            return task.createModel(null);

        List<TaskAttachmentModel> attachmentModels = attachments.stream().map(a -> a.createTaskAttachmentModel(serverHost)).toList();
        return task.createModel(attachmentModels);
    }

    @Operation(summary = "Получение страницы списка задач", tags = "roadmap-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"!project_not_found", "!not_a_member"})
    @GetMapping("/tasks")
    public ResponseEntity<PageableCollection<TaskModel>> getTasks(@RequestParam("rms_id") long stageId, @RequestParam(value = "p", defaultValue = "1") int page) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireStageProjectMembership(userEmail, stageId);

        Page<RoadmapTask> rawPage = roadmapService.getTasksPage(stageId, Math.max(page - 1, 0));
        if (rawPage.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(PageableCollection.fromPage(rawPage, task -> {
            List<FileUpload> attachments = fileUploadService.getTaskAttachments(task.getId());
            if (attachments == null || attachments.isEmpty())
                return task.createModel(null);

            List<TaskAttachmentModel> attachmentModels = attachments.stream().map(a -> a.createTaskAttachmentModel(serverHost)).toList();
            return task.createModel(attachmentModels);
        }));
    }

    @Operation(summary = "Изменить содержимое задачи", tags = "roadmap-api")
    @SuccessResponse("Содержимое задачи изменено")
    @GenericErrorResponse({"!roadmap_task_not_found", "!project_not_found", "!not_a_member", "roadmap_task_attachment_not_found"})
    @PutMapping(value = "/task", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void putTaskData(@RequestParam("rmt_id") long taskId, @Valid TaskDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());

        roadmapService.updateTaskData(
                task, dto.getStatus(), dto.getName(), dto.getDescription(), dto.getDeadlineAt(), dto.getAttachment(),
                fileUploadService::deleteUploadedFiles
        );
    }

    @Operation(summary = "Удаление задачи", tags = "roadmap-api")
    @SuccessResponse("Задача удалена")
    @GenericErrorResponse({"!roadmap_task_not_found", "!project_not_found", "!not_a_member"})
    @DeleteMapping("/task")
    public void deleteTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());
        roadmapService.deleteTask(taskId);
    }

    @Operation(summary = "Получение вложения задачи по ID", tags = "roadmap-api")
    @GenericErrorResponse({"!file_upload_not_found", "!roadmap_task_attachment_not_found", "!project_not_found", "!not_a_member"})
    @GetMapping("/task/attachment")
    public TaskAttachmentModel getTaskAttachment(@RequestParam("rmta_id") UUID attachmentId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        FileUpload fileUpload = fileUploadService.getFileUpload(attachmentId);

        RoadmapTaskAttachment attachment = roadmapService.getTaskAttachment(attachmentId);
        roadmapService.requireTaskProjectMembership(userEmail, attachment.getTaskId());

        return fileUpload.createTaskAttachmentModel(serverHost);
    }

    @Operation(summary = "Получение списка вложений задачи", tags = "roadmap-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse({"!project_not_found", "!not_a_member"})
    @GetMapping("/task/attachments")
    public ResponseEntity<List<TaskAttachmentModel>> getTaskAttachments(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireTaskProjectMembership(userEmail, taskId);

        List<FileUpload> attachments = fileUploadService.getTaskAttachments(taskId);
        if (attachments.isEmpty())
            return ResponseEntity.noContent().build();

        List<TaskAttachmentModel> models = attachments.stream()
                .map(a -> a.createTaskAttachmentModel(serverHost))
                .toList();

        return ResponseEntity.ok(models);
    }

    @Operation(summary = "Загрузка вложения для задачи", tags = "roadmap-api")
    @GenericErrorResponse({"!project_not_found", "!not_a_member", "undefined_file_name", "undefined_content_type", "bad_upload"})
    @PostMapping(value = "/task/attachment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public TaskAttachmentModel uploadTaskAttachment(@RequestParam("rms_id") long stageId, MultipartFile file) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireStageProjectMembership(userEmail, stageId);

        FileUpload fileUpload = fileUploadService.saveFile(file);
        return fileUpload.createTaskAttachmentModel(serverHost);
    }

}
