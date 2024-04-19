package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.storage.repository.roadmap.RoadMapStageRepository;
import ru.easyroadmap.website.storage.repository.roadmap.RoadMapTaskRepository;

@Service
@RequiredArgsConstructor
public final class RoadMapService {

    private final RoadMapStageRepository stageRepository;
    private final RoadMapTaskRepository taskRepository;

}
