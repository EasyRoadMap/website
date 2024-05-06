package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.front.*;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskAttachmentRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceMemberRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public final class PublicApiService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    private final RoadmapStageRepository stageRepository;
    private final RoadmapTaskRepository taskRepository;
    private final RoadmapTaskAttachmentRepository taskAttachmentRepository;

    private final PhotoService photoService;
    private final FileUploadService fileUploadService;

    @Value("${server.host}")
    private String serverHost;

    public FrontWorkspaceModel getWorkspaceModel(UUID workspaceId) throws ApiException {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new ApiException(
                "workspace_not_found",
                "Workspace with this ID doesn't exist"
        ));

        List<FrontWorkspaceModel.ProjectModel> projectModels = new ArrayList<>();
        for (Project project : projectRepository.findAllByWorkspaceIdEquals(workspaceId)) {
            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(PhotoService.generateWorkspacePhotoID(workspaceId));
            projectModels.add(new FrontWorkspaceModel.ProjectModel(project.getId(), project.createInfoModel(), photoModel));
        }

        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(PhotoService.generateWorkspacePhotoID(workspaceId));
        return new FrontWorkspaceModel(
                workspaceId,
                workspace.createInfoModel(),
                workspace.createAppearanceModel(),
                photoModel,
                projectModels
        );
    }

    public FrontProjectModel getProjectModel(UUID projectId) throws ApiException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ApiException(
                "project_not_found",
                "Project with this ID doesn't exist"
        ));

        List<FrontProjectModel.StageModel> stageModels = stageRepository.findAllByProjectIdEquals(projectId).stream()
                .map(RoadmapStage::createFrontModel)
                .toList();

        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(PhotoService.generateProjectPhotoID(projectId));
        return new FrontProjectModel(
                projectId,
                project.createInfoModel(),
                photoModel,
                stageModels
        );
    }

    public List<FrontTaskModel> getTaskList(long stageId) throws ApiException {
        if (!stageRepository.existsById(stageId))
            throw new ApiException("stage_not_found", "Roadmap stage with this ID doesn't exist");

        List<FrontTaskModel> taskModels = new ArrayList<>();

        for (RoadmapTask task : taskRepository.findAllByStageIdEquals(stageId)) {
            List<FrontTaskAttachmentModel> attachmentModels = fileUploadService.getTaskAttachments(task.getId()).stream()
                    .map(a -> a.createFrontTaskAttachmentModel(serverHost))
                    .toList();

            taskModels.add(task.createFrontModel(attachmentModels));
        }

        return taskModels;
    }

}
