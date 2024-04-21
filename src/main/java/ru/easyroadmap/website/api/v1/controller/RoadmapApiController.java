package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.roadmap.*;
import ru.easyroadmap.website.api.v1.model.PageableCollection;
import ru.easyroadmap.website.api.v1.model.roadmap.StageModel;
import ru.easyroadmap.website.api.v1.model.roadmap.TaskModel;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.RoadmapService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/roadmap")
@RequiredArgsConstructor
public class RoadmapApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final RoadmapService roadmapService;

    @Operation(summary = "Create a new roadmap stage", tags = "roadmap-api")
    @PostMapping(value = "/stage/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public StageModel createStage(@RequestParam("pr_id") UUID projectId, @Valid CreateStageDto dto) throws ApiException {
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
    public void setStageName(@RequestParam("rms_id") long stageId, @Valid SetStageNameDto dto) throws ApiException {
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
        roadmapService.requireStageProjectMembership(userEmail, stageId);
        roadmapService.deleteStage(stageId);
    }

    @Operation(summary = "Create a new roadmap task", tags = "roadmap-api")
    @PostMapping(value = "/task/create", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public TaskModel createTask(@RequestParam("rms_id") long stageId, @Valid CreateTaskDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());
        return TaskModel.fromTask(roadmapService.createTask(stageId, dto.getStatus(), dto.getName(), dto.getDescription(), dto.getDeadlineAt()));
    }

    @Operation(summary = "Get a roadmap task by ID", tags = "roadmap-api")
    @GetMapping("/task")
    public TaskModel getTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());
        return TaskModel.fromTask(task);
    }

    @Operation(summary = "Get a page of roadmap tasks list", tags = "roadmap-api")
    @GetMapping("/tasks")
    public ResponseEntity<PageableCollection<TaskModel>> getTasks(@RequestParam("rms_id") long stageId, @RequestParam(value = "p", defaultValue = "1") int page) throws ApiException {
        String userEmail = requireUserExistance(userService);
        UUID projectId = roadmapService.requireStageProjectMembership(userEmail, stageId);

        Page<RoadmapTask> rawPage = roadmapService.getTasksPage(stageId, Math.max(page - 1, 0));
        if (rawPage.isEmpty())
            return ResponseEntity.noContent().build();

        return ResponseEntity.ok(PageableCollection.fromPage(rawPage, TaskModel::fromTask));
    }

    @Operation(summary = "Set a task data", tags = "roadmap-api")
    @PutMapping(value = "/task", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void putTaskData(@RequestParam("rmt_id") long taskId, @Valid PutTaskDataDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapTask task = roadmapService.getTask(taskId);
        roadmapService.requireStageProjectMembership(userEmail, task.getStageId());
        roadmapService.updateTaskData(task, dto.getStatus(), dto.getName(), dto.getDescription(), dto.getDeadlineAt());
    }

    @Operation(summary = "Delete a task", tags = "roadmap-api")
    @DeleteMapping("/task")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTask(@RequestParam("rmt_id") long taskId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        roadmapService.requireTaskProjectMembership(userEmail, taskId);
        roadmapService.deleteTask(taskId);
    }

}
