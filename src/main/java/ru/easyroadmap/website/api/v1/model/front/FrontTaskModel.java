package ru.easyroadmap.website.api.v1.model.front;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.easyroadmap.website.storage.model.roadmap.RoadmapTask.Status;

import java.time.LocalDate;
import java.util.List;

public record FrontTaskModel(
        @JsonProperty("status") Status status,
        @JsonProperty("name") String name,
        @JsonProperty("description") @JsonInclude(JsonInclude.Include.NON_NULL) String description,
        @JsonProperty("deadline_at") @JsonInclude(JsonInclude.Include.NON_NULL) @JsonFormat(pattern = "yyyy-MM-dd") LocalDate deadlineAt,
        @JsonProperty("attachments") @JsonInclude(JsonInclude.Include.NON_EMPTY) List<FrontTaskAttachmentModel> attachments
) { }
