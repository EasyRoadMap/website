package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.easyroadmap.website.api.v1.dto.roadmap.CreateStageDto;
import ru.easyroadmap.website.api.v1.model.roadmap.StageModel;
import ru.easyroadmap.website.api.v1.service.ProjectService;
import ru.easyroadmap.website.api.v1.service.RoadmapService;
import ru.easyroadmap.website.api.v1.service.UserService;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/roadmap")
@RequiredArgsConstructor
public class RoadmapApiController extends ApiControllerBase {

    private final UserService userService;
    private final ProjectService projectService;
    private final RoadmapService roadmapService;

    @Operation(summary = "Create a new roadmap stage", tags = "roadmap-api")
    @PostMapping("/stage/create")
    public StageModel createStage(@RequestParam("pr_id") UUID projectId, @Valid CreateStageDto dto) throws ApiException {
        String userEmail = requireUserExistance(userService);
        projectService.requireProjectMembership(userEmail, projectId);

        RoadmapStage stage = roadmapService.createStage(projectId, dto.getName());
        return StageModel.fromStage(stage, 0F);
    }

    @Operation(summary = "Get a roadmap stage by ID")
    @GetMapping("/stage")
    public StageModel getStage(@RequestParam("rms_id") long stageId) throws ApiException {
        String userEmail = requireUserExistance(userService);
        RoadmapStage stage = roadmapService.getStage(stageId);
        projectService.requireProjectMembership(userEmail, stage.getProjectId());

        float progress = roadmapService.computeStageProgress(stageId);
        return StageModel.fromStage(stage, progress);
    }

}
