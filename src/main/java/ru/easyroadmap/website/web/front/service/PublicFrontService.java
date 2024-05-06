package ru.easyroadmap.website.web.front.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.exception.GenericErrorException;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;
import ru.easyroadmap.website.storage.repository.workspace.WorkspaceRepository;

import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public final class PublicFrontService {

    private final WorkspaceRepository workspaceRepository;
    private final ProjectRepository projectRepository;

    public void requireWorkspaceExistance(UUID workspaceId) throws GenericErrorException {
        if (!workspaceRepository.existsById(workspaceId)) {
            throw new GenericErrorException(HttpStatus.NOT_FOUND, "workspace_not_found", "Workspace with this ID doesn't exist");
        }
    }

    public void requireProjectExistance(UUID workspaceId, UUID projectId) throws GenericErrorException {
        requireWorkspaceExistance(workspaceId);

        UUID projectWorkspaceId = projectRepository.getProjectWorkspaceId(projectId).orElseThrow(() -> new GenericErrorException(
                HttpStatus.NOT_FOUND, "project_not_found", "Project with this ID doesn't exist"
        ));

        if (!Objects.equals(workspaceId, projectWorkspaceId)) {
            throw new GenericErrorException(HttpStatus.BAD_REQUEST, "project_not_owned", "This project isn't owned by this workspace");
        }
    }

}
