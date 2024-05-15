package ru.easyroadmap.website.api.v1.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.easyroadmap.website.api.v1.model.front.FrontProjectModel;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskModel;
import ru.easyroadmap.website.api.v1.model.front.FrontWorkspaceModel;
import ru.easyroadmap.website.api.v1.service.PublicApiService;
import ru.easyroadmap.website.docs.annotation.DescribeError;
import ru.easyroadmap.website.docs.annotation.GenericErrorResponse;
import ru.easyroadmap.website.docs.annotation.SuccessResponse;
import ru.easyroadmap.website.exception.ApiException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicApiController extends ApiControllerBase {

    private final PublicApiService publicApiService;

    @Operation(summary = "Получение рабочей области по ID", tags = "public-api")
    @GenericErrorResponse("ws_not_exists")
    @DescribeError(code = "ws_not_exists", userMessage = "Рабочая область не существует", forUser = true)
    @GetMapping("/workspace")
    public FrontWorkspaceModel getWorkspace(@RequestParam("ws_id") UUID workspaceId) throws ApiException {
        return publicApiService.getWorkspaceModel(workspaceId);
    }

    @Operation(summary = "Получение проекта по ID", tags = "public-api")
    @GenericErrorResponse("pr_not_exists")
    @DescribeError(code = "pr_not_exists", userMessage = "Проект не существует", forUser = true)
    @GetMapping("/project")
    public FrontProjectModel getProject(@RequestParam("pr_id") UUID projectId) throws ApiException {
        return publicApiService.getProjectModel(projectId);
    }

    @Operation(summary = "Получение списка задач по ID этапа", tags = "public-api")
    @SuccessResponse(canBeEmpty = true)
    @GenericErrorResponse("rms_not_exists")
    @DescribeError(code = "rms_not_exists", userMessage = "Этап дорожной карты не существует", forUser = true)
    @GetMapping("/roadmap/tasks")
    public ResponseEntity<List<FrontTaskModel>> getRoadmapTasks(@RequestParam("rms_id") long stageId) throws ApiException {
        List<FrontTaskModel> result = publicApiService.getTaskList(stageId);
        return result == null || result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
    }

}
