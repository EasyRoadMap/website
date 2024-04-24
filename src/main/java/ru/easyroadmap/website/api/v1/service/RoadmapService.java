package ru.easyroadmap.website.api.v1.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.local.FileSystemStorage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment.Type;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskAttachmentRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoadmapService {

    public static final int MAX_STAGES_PER_ROADMAP = 25;
    public static final int MAX_TASKS_PER_STAGE = 100;

    public static final int STAGES_PAGE_SIZE = 10;
    public static final int TASKS_PAGE_SIZE = 10;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    private final RoadmapStageRepository stageRepository;
    private final RoadmapTaskRepository taskRepository;
    private final RoadmapTaskAttachmentRepository taskAttachmentRepository;

    private final FileSystemStorage fileSystemStorage;

    public RoadmapStage createStage(UUID projectId, String name) throws ApiException {
        int position = stageRepository.countAllByProjectIdEquals(projectId);
        if (position >= MAX_STAGES_PER_ROADMAP)
            throw new ApiException("too_much_stages", "One project roadmap can have no more than 25 stages");

        RoadmapStage stage = new RoadmapStage(projectId, (byte) position, name);
        stageRepository.save(stage);
        return stage;
    }

    public RoadmapTask createTask(long stageId, byte status, String name, String description, LocalDate deadlineAt) throws ApiException {
        int taskCount = taskRepository.countAllByStageIdEquals(stageId);
        if (taskCount >= MAX_TASKS_PER_STAGE)
            throw new ApiException("too_much_tasks", "One roadmap stage can have no more than 100 tasks");

        RoadmapTask task = new RoadmapTask(stageId, status, name, description, deadlineAt);
        taskRepository.save(task);
        updateStageProgress(stageId);
        return task;
    }

    public RoadmapTaskAttachment createTaskAttachment(long taskId, MultipartFile file) throws ApiException {
        String mimeType = file.getContentType();
        if (mimeType == null || mimeType.isBlank())
            throw new ApiException("undefined_content_type", "Content type must be defined");

        try (InputStream inputStream = file.getInputStream()) {
            String md5 = DigestUtils.md5DigestAsHex(inputStream);
            long size = file.getSize();

            Type attachmentType = Type.fromMimeType(mimeType);
            RoadmapTaskAttachment attachment = new RoadmapTaskAttachment(taskId, attachmentType.getId(), mimeType, md5, size);
            taskAttachmentRepository.save(attachment);

            Path filePath = getTaskAttachmentFilePath(attachment.getId());

            if (!Files.isDirectory(filePath.getParent()))
                Files.createDirectories(filePath.getParent());

            file.transferTo(filePath);
            return attachment;
        } catch (IOException ex) {
            log.warn("Unable to serve uploaded attachment: {}", ex.toString());
            throw new ApiException("bad_attachment", "The attachment cannot be served");
        }
    }

    public void moveStage(RoadmapStage stage, byte position) throws ApiException {
        byte current = stage.getPosition();
        if (current == position)
            return;

        int maxPosition = stageRepository.countAllByProjectIdEquals(stage.getProjectId());
        if (position >= maxPosition)
            throw new ApiException("position_out_of_bounds", "Desired position is out of the max bound");

        if (current < position) {
            // move to right
            stageRepository.updatePositionsAfter(stage.getProjectId(), current, position);
        } else {
            // move to left
            stageRepository.updatePositionsBefore(stage.getProjectId(), current, position);
        }

        stage.setPosition(position);
        stageRepository.save(stage);
    }

    public void updateStageProgress(long stageId) throws ApiException {
        RoadmapStage stage = getStage(stageId);
        stage.setProgress(computeStageProgress(stageId));
        stageRepository.save(stage);
    }

    public float computeStageProgress(long stageId) {
        int total = countTotalStageTasks(stageId);
        if (total <= 0)
            return 0F;

        int notPlanned = countNotPlannedStageTasks(stageId);
        if (notPlanned >= total)
            return 1F;

        return Math.max(Math.min((float) notPlanned / total, 1F), 0F);
    }

    public int countNotPlannedStageTasks(long stageId) {
        return taskRepository.countNotPlannedStageTasks(stageId);
    }

    public int countTotalStageTasks(long stageId) {
        return taskRepository.countAllByStageIdEquals(stageId);
    }

    public Page<RoadmapStage> getStagesPage(UUID projectId, int page) {
        PageRequest pageRequest = PageRequest.of(page, STAGES_PAGE_SIZE, Sort.by("position"));
        return stageRepository.findAllByProjectIdEquals(projectId, pageRequest);
    }

    public Page<RoadmapTask> getTasksPage(long stageId, int page) {
        Sort sort = Sort.by("status", "deadlineAt", "name").ascending();
        PageRequest pageRequest = PageRequest.of(page, TASKS_PAGE_SIZE, sort);
        return taskRepository.findAllByStageIdEquals(stageId, pageRequest);
    }

    public List<RoadmapTaskAttachment> getTaskAttachments(long taskId) {
        return taskAttachmentRepository.findAllByTaskIdEquals(taskId);
    }

    public void updateStageName(RoadmapStage stage, String name) {
        stage.setName(name);
        stageRepository.save(stage);
    }

    public void updateTaskData(RoadmapTask task, byte status, String name, String description, LocalDate deadlineAt, UUID[] attachmentIds) throws ApiException {
        if (attachmentIds == null || attachmentIds.length == 0) {
            List<UUID> ids = taskAttachmentRepository.findAllAttachmentIds(task.getId());
            deleteUnusedAttachmentFiles(ids);
            taskAttachmentRepository.deleteAllById(ids);
        } else {
            for (UUID attachmentId : attachmentIds)
                if (!isTaskAttachmentExist(attachmentId))
                    throw new ApiException(
                            "roadmap_task_attachment_not_found",
                            "Roadmap task attachment with ID '%s' wasn't uploaded".formatted(attachmentId)
                    );

            List<UUID> ids = taskAttachmentRepository.findUnusedAttachmentIds(task.getId(), attachmentIds);
            deleteUnusedAttachmentFiles(ids);
            taskAttachmentRepository.deleteAllById(ids);
        }

        task.setStatus(status);
        task.setName(name);
        task.setDescription(description);
        task.setDeadlineAt(deadlineAt);
        taskRepository.save(task);

        updateStageProgress(task.getStageId());
    }

    public void deleteStage(long stageId) {
        stageRepository.deleteById(stageId);
    }

    public void deleteTask(RoadmapTask task) throws ApiException {
        taskRepository.delete(task);
        updateStageProgress(task.getStageId());
    }

    public RoadmapStage getStage(long stageId) throws ApiException {
        return stageRepository.findById(stageId).orElseThrow(() -> new ApiException(
                "roadmap_stage_not_found",
                "Roadmap stage with this ID isn't exist"
        ));
    }

    public RoadmapTask getTask(long taskId) throws ApiException {
        return taskRepository.findById(taskId).orElseThrow(() -> new ApiException(
                "roadmap_task_not_found",
                "Roadmap task with this ID isn't exist"
        ));
    }

    public RoadmapTaskAttachment getTaskAttachment(UUID attachmentId) throws ApiException {
        return taskAttachmentRepository.findById(attachmentId).orElseThrow(() -> new ApiException(
                "roadmap_task_attachment_not_found",
                "Roadmap task attachment with this ID isn't exist"
        ));
    }

    public boolean isStageExist(long stageId) {
        return stageRepository.existsById(stageId);
    }

    public boolean isTaskExist(long taskId) {
        return taskRepository.existsById(taskId);
    }

    public boolean isTaskAttachmentExist(UUID attachmentId) {
        return taskAttachmentRepository.existsById(attachmentId);
    }

    public void requireStageExistance(long stageId) throws ApiException {
        if (!isStageExist(stageId)) {
            throw new ApiException("roadmap_stage_not_found", "Roadmap stage with this ID isn't exist");
        }
    }

    public void requireTaskExistance(long taskId) throws ApiException {
        if (!isTaskExist(taskId)) {
            throw new ApiException("roadmap_task_not_found", "Roadmap task with this ID isn't exist");
        }
    }

    public boolean isProjectExist(UUID projectId) {
        return projectRepository.existsById(projectId);
    }

    public UUID requireStageProjectMembership(String userEmail, long stageId) throws ApiException {
        UUID projectId = stageRepository.getStageProjectId(stageId).orElseThrow(() -> new ApiException(
                "project_not_found",
                "This stage doesn't belongs to anyone project"
        ));

        requireProjectExistance(projectId);
        if (!projectMemberRepository.existsByUserEmailEqualsAndProjectIdEquals(userEmail, projectId))
            throw new ApiException("not_a_member", "You're not a member of this project");

        return projectId;
    }

    public UUID requireTaskProjectMembership(String userEmail, long taskId) throws ApiException {
        UUID projectId = taskRepository.getTaskProjectId(taskId).orElseThrow(() -> new ApiException(
                "project_not_found",
                "This task doesn't belongs to anyone project roadmap stage"
        ));

        requireProjectExistance(projectId);
        if (!projectMemberRepository.existsByUserEmailEqualsAndProjectIdEquals(userEmail, projectId))
            throw new ApiException("not_a_member", "You're not a member of this project");

        return projectId;
    }

    public void requireProjectExistance(UUID projectId) throws ApiException {
        if (!isProjectExist(projectId)) {
            throw new ApiException("project_not_exists", "There is no project with this ID");
        }
    }

    public Path getTaskAttachmentFilePath(UUID id) {
        String name = id.toString();
        return fileSystemStorage.getPath("task-attachments").resolve(name.substring(0, 2)).resolve(name);
    }

    private void deleteUnusedAttachmentFiles(Iterable<UUID> ids) {
        for (UUID id : ids) {
            Path filePath = getTaskAttachmentFilePath(id);

            try {
                fileSystemStorage.delete(filePath);
            } catch (IOException ex) {
                log.warn("Unable to delete unused attachment file '{}': {}", filePath, ex.toString());
            }
        }
    }

}
