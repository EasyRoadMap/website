package ru.easyroadmap.website.api.v1.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTaskAttachment;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskAttachmentRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RoadmapService {

    public static final int MAX_STAGES_PER_ROADMAP = 25;
    public static final int MAX_TASKS_PER_STAGE = 25;

    public static final int STAGES_PAGE_SIZE = 10;
    public static final int TASKS_PAGE_SIZE = 10;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    private final RoadmapStageRepository stageRepository;
    private final RoadmapTaskRepository taskRepository;
    private final RoadmapTaskAttachmentRepository taskAttachmentRepository;

    private final FileUploadService fileUploadService;

    public RoadmapStage createStage(UUID projectId, String name) throws ApiException {
        int position = stageRepository.countAllByProjectIdEquals(projectId);
        if (position >= MAX_STAGES_PER_ROADMAP)
            throw new ApiException("too_much_stages", "One project roadmap can have no more than 25 stages");

        RoadmapStage stage = new RoadmapStage(projectId, (byte) position, name);
        stageRepository.save(stage);
        return stage;
    }

    public RoadmapTask createTask(long stageId, byte status, String name, String description, LocalDate deadlineAt, UUID[] uploadIds) throws ApiException {
        int taskCount = taskRepository.countAllByStageIdEquals(stageId);
        if (taskCount >= MAX_TASKS_PER_STAGE)
            throw new ApiException("too_much_tasks", "One roadmap stage can have no more than 25 tasks");

        RoadmapTask task = new RoadmapTask(stageId, status, name, description, deadlineAt);
        taskRepository.save(task);
        updateStageProgress(stageId);

        if (uploadIds != null) {
            for (UUID uploadId : uploadIds)
                if (!fileUploadService.isFileUploadExist(uploadId))
                    throw new ApiException(
                            "roadmap_task_attachment_not_found",
                            "Roadmap task attachment with ID '%s' wasn't uploaded".formatted(uploadId)
                    );

            for (UUID uploadId : uploadIds) {
                RoadmapTaskAttachment attachment = new RoadmapTaskAttachment(task.getId(), uploadId);
                taskAttachmentRepository.save(attachment);
            }
        }

        return task;
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

    public boolean hasInProgressTask(long stageId) {
        return taskRepository.existsByStageIdEqualsAndStatusEquals(stageId, 0);
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
        return taskRepository.countDoneStageTasks(stageId);
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
        return taskRepository.findAllByStageIdEquals(stageId, PageRequest.of(page, TASKS_PAGE_SIZE, sort));
    }

    public void updateStageName(RoadmapStage stage, String name) {
        stage.setName(name);
        stageRepository.save(stage);
    }

    public void updateTaskData(
            RoadmapTask task,
            byte status,
            String name,
            String description,
            LocalDate deadlineAt,
            UUID[] uploadIds,
            Consumer<List<UUID>> unusedUploadIdsConsumer
    ) throws ApiException {
        long taskId = task.getId();

        if (uploadIds == null || uploadIds.length == 0) {
            List<UUID> ids = taskAttachmentRepository.findAllAttachmentIds(taskId);
            unusedUploadIdsConsumer.accept(ids);
            taskAttachmentRepository.deleteAllByTaskIdEquals(taskId);
        } else {
            for (UUID uploadId : uploadIds)
                if (!fileUploadService.isFileUploadExist(uploadId))
                    throw new ApiException(
                            "roadmap_task_attachment_not_found",
                            "Roadmap task attachment with ID '%s' wasn't uploaded".formatted(uploadId)
                    );

            List<UUID> ids = taskAttachmentRepository.findUnusedAttachmentIds(taskId, uploadIds);
            unusedUploadIdsConsumer.accept(ids);
            taskAttachmentRepository.deleteAllByTaskIdEquals(taskId);

            for (UUID uploadId : uploadIds) {
                RoadmapTaskAttachment attachment = new RoadmapTaskAttachment(taskId, uploadId);
                taskAttachmentRepository.save(attachment);
            }
        }

        task.setStatus(status);
        task.setName(name);
        task.setDescription(description);
        task.setDeadlineAt(deadlineAt);
        taskRepository.save(task);

        updateStageProgress(task.getStageId());
    }

    public void deleteStage(UUID projectId, long stageId) {
        Optional<Byte> position = stageRepository.getStagePosition(stageId);

        List<Long> roadmapTaskIds = taskRepository.getAllTasksInStage(stageId);
        if (!roadmapTaskIds.isEmpty()) {
            taskAttachmentRepository.deleteAllByTaskIdIn(roadmapTaskIds);
            taskRepository.deleteAllByStageIdEquals(stageId);
        }

        stageRepository.deleteById(stageId);

        position.ifPresent(pos -> stageRepository.decrementPositionsAfter(projectId, pos));
    }

    public void deleteTask(long taskId) throws ApiException {
        Optional<Long> stageId = taskRepository.getTaskStageId(taskId);

        taskAttachmentRepository.deleteAllByTaskIdEquals(taskId);
        taskRepository.deleteById(taskId);

        if (stageId.isPresent()) {
            updateStageProgress(stageId.get());
        }
    }

    public RoadmapStage getStage(long stageId) throws ApiException {
        return stageRepository.findById(stageId).orElseThrow(() -> new ApiException(
                "roadmap_stage_not_found",
                "Roadmap stage with this ID doesn't exists"
        ));
    }

    public RoadmapTask getTask(long taskId) throws ApiException {
        return taskRepository.findById(taskId).orElseThrow(() -> new ApiException(
                "roadmap_task_not_found",
                "Roadmap task with this ID doesn't exists"
        ));
    }

    public RoadmapTaskAttachment getTaskAttachment(long attachmentId) throws ApiException {
        return taskAttachmentRepository.findById(attachmentId).orElseThrow(() -> new ApiException(
                "roadmap_task_attachment_not_found",
                "Roadmap task attachment with this ID doesn't exists"
        ));
    }

    public RoadmapTaskAttachment getTaskAttachment(UUID uploadId) throws ApiException {
        return taskAttachmentRepository.findByAttachmentIdEquals(uploadId).orElseThrow(() -> new ApiException(
                "roadmap_task_attachment_not_found",
                "Roadmap task attachment with this upload ID doesn't exists"
        ));
    }

    public boolean isStageExist(long stageId) {
        return stageRepository.existsById(stageId);
    }

    public boolean isTaskExist(long taskId) {
        return taskRepository.existsById(taskId);
    }

    public void requireStageExistance(long stageId) throws ApiException {
        if (!isStageExist(stageId)) {
            throw new ApiException("roadmap_stage_not_found", "Roadmap stage with this ID doesn't exists");
        }
    }

    public void requireTaskExistance(long taskId) throws ApiException {
        if (!isTaskExist(taskId)) {
            throw new ApiException("roadmap_task_not_found", "Roadmap task with this ID doesn't exists");
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

}
