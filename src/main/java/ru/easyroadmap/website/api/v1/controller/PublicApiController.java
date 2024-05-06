package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.easyroadmap.website.api.v1.model.front.FrontProjectModel;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskModel;
import ru.easyroadmap.website.api.v1.model.front.FrontWorkspaceModel;
import ru.easyroadmap.website.api.v1.service.PublicApiService;
import ru.easyroadmap.website.exception.ApiException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicApiController extends ApiControllerBase {

    private final PublicApiService publicApiService;

    @Operation(summary = "Get a workspace model", tags = "public-api")
    @GetMapping("/workspace")
    public FrontWorkspaceModel getWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        return publicApiService.getWorkspaceModel(workspaceId);
    }

    @Operation(summary = "Get a project model", tags = "public-api")
    @GetMapping("/project")
    public FrontProjectModel getProject(@RequestParam("pr_id") UUID projectId) throws ApiException {
        return publicApiService.getProjectModel(projectId);
    }

    @Operation(summary = "Get a page of roadmap tasks list", tags = "public-api")
    @GetMapping("/roadmap/tasks")
    public List<FrontTaskModel> getRoadmapTasks(@RequestParam("rms_id") long stageId) throws ApiException {
        return publicApiService.getTaskList(stageId);
    }

}
