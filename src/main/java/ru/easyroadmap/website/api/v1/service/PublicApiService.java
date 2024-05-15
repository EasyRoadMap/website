package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.api.v1.model.PhotoModel;
import ru.easyroadmap.website.api.v1.model.front.FrontProjectModel;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskAttachmentModel;
import ru.easyroadmap.website.api.v1.model.front.FrontTaskModel;
import ru.easyroadmap.website.api.v1.model.front.FrontWorkspaceModel;
import ru.easyroadmap.website.api.v1.model.project.ProjectInfoModel;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.repository.project.ProjectLinkRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskAttachmentRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public final class PublicApiService {

    private final WorkspaceRepository workspaceRepository;

    private final ProjectRepository projectRepository;
    private final ProjectLinkRepository projectLinkRepository;

    private final RoadmapStageRepository stageRepository;
    private final RoadmapTaskRepository taskRepository;
    private final RoadmapTaskAttachmentRepository taskAttachmentRepository;

    private final PhotoService photoService;
    private final FileUploadService fileUploadService;

    @Value("${server.host}")
    private String serverHost;

    public FrontWorkspaceModel getWorkspaceModel(UUID workspaceId) throws ApiException {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new ApiException(
                "ws_not_exists",
                "Workspace with this ID doesn't exist"
        ));

        List<FrontWorkspaceModel.ProjectModel> projectModels = new ArrayList<>();
        for (Project project : projectRepository.findAllByWorkspaceIdEquals(workspaceId)) {
            UUID projectId = project.getId();
            ProjectInfoModel infoModel = project.createInfoModel(() -> taskRepository.getMostFarTaskDeadline(projectId));
            PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(PhotoService.generateProjectPhotoID(projectId));
            projectModels.add(new FrontWorkspaceModel.ProjectModel(projectId, infoModel, photoModel));
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
                "pr_not_exists",
                "Project with this ID doesn't exist"
        ));

        List<FrontProjectModel.LinkModel> linkModels = projectLinkRepository.findAllByProjectIdEquals(projectId).stream()
                .map(ProjectLink::createFrontModel)
                .toList();

        List<FrontProjectModel.StageModel> stageModels = stageRepository.findAllByProjectIdEquals(projectId).stream()
                .map(s -> s.createFrontModel(taskRepository.existsByStageIdEqualsAndStatusEquals(s.getId(), 0)))
                .toList();

        PhotoModel photoModel = photoService.getPhotoModelOrDefaultPicture(PhotoService.generateProjectPhotoID(projectId));
        return new FrontProjectModel(
                projectId,
                project.createInfoModel(() -> taskRepository.getMostFarTaskDeadline(projectId)),
                photoModel,
                linkModels,
                stageModels
        );
    }

    public List<FrontTaskModel> getTaskList(long stageId) throws ApiException {
        if (!stageRepository.existsById(stageId))
            throw new ApiException("rms_not_exists", "Roadmap stage with this ID doesn't exist");

        Sort sort = Sort.by("status", "deadlineAt", "name").ascending();
        List<FrontTaskModel> taskModels = new ArrayList<>();

        for (RoadmapTask task : taskRepository.findAllByStageIdEquals(stageId, Pageable.unpaged())) {
            List<FrontTaskAttachmentModel> attachmentModels = fileUploadService.getTaskAttachments(task.getId()).stream()
                    .map(a -> a.createFrontTaskAttachmentModel(serverHost))
                    .toList();

            taskModels.add(task.createFrontModel(attachmentModels));
        }

        return taskModels;
    }

}
