package ru.easyroadmap.website.api.v1.model.roadmap;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask.Status;

import java.time.LocalDate;

public record TaskModel(
        @JsonProperty("id") long id,
        @JsonProperty("status") Status status,
        @JsonProperty("name") String name,
        @JsonProperty("description") @JsonInclude(JsonInclude.Include.NON_NULL) String description,
        @JsonProperty("deadline_at") @JsonFormat(pattern = "yyyy-MM-dd") @JsonInclude(JsonInclude.Include.NON_NULL) LocalDate deadlineAt
) {

    public static TaskModel fromTask(RoadmapTask task) {
        return new TaskModel(
                task.getId(),
                task.getStatus(),
                task.getName(),
                task.getDescription(),
                task.getDeadlineAt()
        );
    }

}