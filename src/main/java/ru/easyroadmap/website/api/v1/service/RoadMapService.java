package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask.Status;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadmapTaskRepository;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class RoadmapService {

    public static final int MAX_STAGES_PER_ROADMAP = 25;
    public static final int MAX_TASKS_PER_STAGE = 100;

    public static final int STAGES_PAGE_SIZE = 10;
    public static final int TASKS_PAGE_SIZE = 10;

    private final RoadmapStageRepository stageRepository;
    private final RoadmapTaskRepository taskRepository;

    public RoadmapStage createStage(UUID projectId, String name) throws ApiException {
        int position = stageRepository.countAllByProjectIdEquals(projectId);
        if (position >= MAX_STAGES_PER_ROADMAP)
            throw new ApiException("too_much_stages", "One project roadmap can have no more than 25 stages");

        RoadmapStage stage = new RoadmapStage(projectId, (byte) position, name);
        stageRepository.save(stage);
        return stage;
    }

    public RoadmapTask createTask(long stageId, Status status, String name, String description, LocalDate deadlineAt) {
        RoadmapTask task = new RoadmapTask(stageId, status, name, description, deadlineAt);
        taskRepository.save(task);
        return task;
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
        PageRequest pageRequest = PageRequest.of(page, STAGES_PAGE_SIZE);
        return stageRepository.findAllByProjectIdEquals(projectId, pageRequest);
    }

    public Page<RoadmapTask> getTasksPage(long stageId, int page) {
        PageRequest pageRequest = PageRequest.of(page, TASKS_PAGE_SIZE, Sort.by("status", "deadline_at", "name"));
        return taskRepository.findAllByStageIdEquals(stageId, pageRequest);
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

    public boolean isStageExist(long stageId) {
        return stageRepository.existsById(stageId);
    }

    public boolean isTaskExist(long taskId) {
        return taskRepository.existsById(taskId);
    }

}
