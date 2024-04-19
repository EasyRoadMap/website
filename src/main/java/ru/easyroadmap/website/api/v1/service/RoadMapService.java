package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapStage;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadMapTask.Status;
import ru.easyroadmap.website.storage.repository.roadmap.RoadMapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadMapTaskRepository;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class RoadMapService {

    public static final int MAX_STAGES_PER_ROADMAP = 25;
    public static final int MAX_TASKS_PER_STAGE = 100;

    public static final int STAGES_PAGE_SIZE = 10;
    public static final int TASKS_PAGE_SIZE = 10;

    private final RoadMapStageRepository stageRepository;
    private final RoadMapTaskRepository taskRepository;

    public RoadMapStage createStage(UUID projectId, String name) throws ApiException {
        int position = stageRepository.countAllByProjectIdEquals(projectId);
        if (position >= MAX_STAGES_PER_ROADMAP)
            throw new ApiException("too_much_stages", "One project roadmap can have no more than 25 stages");

        RoadMapStage stage = new RoadMapStage(projectId, (byte) position, name);
        stageRepository.save(stage);
        return stage;
    }

    public RoadMapTask createTask(long stageId, Status status, String name, String description, LocalDate deadlineAt) {
        RoadMapTask task = new RoadMapTask(stageId, status, name, description, deadlineAt);
        taskRepository.save(task);
        return task;
    }

    public Page<RoadMapStage> getStagesPage(UUID projectId, int page) {
        PageRequest pageRequest = PageRequest.of(page, STAGES_PAGE_SIZE);
        return stageRepository.findAllByProjectIdEquals(projectId, pageRequest);
    }

    public Page<RoadMapTask> getTasksPage(long stageId, int page) {
        PageRequest pageRequest = PageRequest.of(page, TASKS_PAGE_SIZE, Sort.by("status", "deadline_at", "name"));
        return taskRepository.findAllByStageIdEquals(stageId, pageRequest, pageRequest.getSort());
    }

    public RoadMapStage getState(long stageId) throws ApiException {
        return stageRepository.findById(stageId).orElseThrow(() -> new ApiException(
                "roadmap_stage_not_found",
                "Roadmap stage with this ID isn't exist"
        ));
    }

    public RoadMapTask getTask(long taskId) throws ApiException {
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
