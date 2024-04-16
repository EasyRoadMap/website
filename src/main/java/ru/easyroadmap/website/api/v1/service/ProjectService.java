package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.api.v1.dto.project.PutProjectLinksDto.LinkFacade;
import ru.easyroadmap.website.exception.ApiException;
import ru.easyroadmap.website.storage.model.project.Project;
import ru.easyroadmap.website.storage.model.project.ProjectLink;
import ru.easyroadmap.website.storage.model.project.ProjectMember;
import ru.easyroadmap.website.storage.model.workspace.Workspace;
import ru.easyroadmap.website.storage.repository.project.ProjectLinkRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectMemberRepository;
import ru.easyroadmap.website.storage.repository.project.ProjectRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public final class ProjectService {

    private static final int MAX_PROJECTS_PER_WORKSPACE = 5;

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository memberRepository;
    private final ProjectLinkRepository linkRepository;

    public Project createProject(UUID workspaceId, String name, String description, LocalDate deadlineAt) throws ApiException {
        int projectsCount = projectRepository.countAllByWorkspaceIdEquals(workspaceId);
        if (projectsCount >= MAX_PROJECTS_PER_WORKSPACE)
            throw new ApiException("too_many_projects", "No more than 5 projects can be in the workspace");

        Project project = new Project(workspaceId, name, description, deadlineAt);
        projectRepository.save(project);
        return project;
    }

    public List<Project> getJoinedProjects(String userEmail, UUID workspaceId) {
        return projectRepository.getJoinedProjects(userEmail, workspaceId);
    }

    public List<ProjectMember> getProjectMembers(UUID projectId) {
        return memberRepository.findAllByProjectIdEquals(projectId);
    }

    public void deleteProject(UUID projectId) {
        linkRepository.deleteAllByProjectIdEquals(projectId);
        memberRepository.deleteAllByProjectIdEquals(projectId);
        projectRepository.deleteById(projectId);
    }

    public ProjectMember addToProject(UUID projectId, String otherUserEmail, String role) throws ApiException {
        if (memberRepository.existsByUserEmailEqualsAndProjectIdEquals(otherUserEmail, projectId))
            throw new ApiException("already_joined", "Requested user is already joined to this project");

        ProjectMember member = new ProjectMember(projectId, otherUserEmail, role);
        memberRepository.save(member);
        return member;
    }

    public ProjectMember kickFromProject(UUID projectId, String otherUserEmail) throws ApiException {
        ProjectMember member = memberRepository.findByUserEmailEqualsAndProjectIdEquals(otherUserEmail, projectId)
                .orElseThrow(() -> new ApiException(
                        "not_a_member",
                        "Requested user isn't a member of this project"
                ));

        memberRepository.delete(member);
        return member;
    }

    public ProjectMember joinToProject(String userEmail, UUID projectId) throws ApiException {
        if (memberRepository.existsByUserEmailEqualsAndProjectIdEquals(userEmail, projectId))
            throw new ApiException("already_joined", "You're already joined to this project");

        ProjectMember member = new ProjectMember(projectId, userEmail, null);
        memberRepository.save(member);
        return member;
    }

    public ProjectMember leaveFromProject(String userEmail, UUID projectId) throws ApiException {
        ProjectMember member = memberRepository.findByUserEmailEqualsAndProjectIdEquals(userEmail, projectId)
                .orElseThrow(() -> new ApiException(
                        "not_a_member",
                        "You're not a member of this project"
                ));

        memberRepository.delete(member);
        return member;
    }

    public List<ProjectLink> getProjectLinks(UUID projectId) {
        return linkRepository.findAllByProjectIdEquals(projectId);
    }

    public void updateProjectLinks(UUID projectId, List<LinkFacade> facades) {
        List<ProjectLink> links = linkRepository.findAllByProjectIdEquals(projectId);

        int count = facades != null ? facades.size() : 0;
        if (links.size() < count) {
            links = new ArrayList<>(links);

            int missing = count - links.size();
            for (int i = 0; i < missing; i++) {
                links.add(new ProjectLink(projectId, null, null));
            }
        } else if (links.size() > count) {
            List<Long> idsToRemove = links.subList(count, links.size()).stream()
                    .map(ProjectLink::getId)
                    .toList();

            linkRepository.deleteAllByIdIn(idsToRemove);
            links = links.subList(0, count);
        }

        for (int i = 0; i < count; i++) {
            LinkFacade facade = facades.get(i);
            links.get(i).update(facade.name(), facade.url());
        }

        if (!links.isEmpty()) {
            linkRepository.saveAll(links);
        }
    }

    public Project updateProjectInfo(Project project, String name, String description, LocalDate deadlineAt) {
        project.setName(name);
        project.setDescription(description);
        project.setDeadlineAt(deadlineAt);
        return project;
    }

    public Project getProject(UUID projectId) throws ApiException {
        return projectRepository.findById(projectId).orElseThrow(() -> new ApiException(
                "project_not_exists",
                "There is no project with this ID"
        ));
    }

    public Workspace getProjectWorkspace(UUID projectId) throws ApiException {
        return projectRepository.getProjectWorkspace(projectId).orElseThrow(() -> new ApiException(
                "workspace_not_exists",
                "There is no workspace of this project"
        ));
    }

    public Optional<String> getProjectWorkspaceAdminId(UUID projectId) {
        return projectRepository.getProjectWorkspaceAdminId(projectId);
    }

    public boolean isProjectExist(UUID projectId) {
        return projectRepository.existsById(projectId);
    }

    public void requireProjectExistance(UUID projectId) throws ApiException {
        if (!isProjectExist(projectId)) {
            throw new ApiException("project_not_exists", "There is no project with this ID");
        }
    }

    public Project requireProjectWorkspaceAdminRights(String userEmail, UUID projectId) throws ApiException {
        requireProjectExistance(projectId);
        return projectRepository.getProjectAsWorkspaceAdmin(projectId, userEmail).orElseThrow(() -> new ApiException(
                "not_enough_rights",
                "This action isn't available to you"
        ));
    }

    public Project requireProjectMembership(String userEmail, UUID projectId) throws ApiException {
        requireProjectExistance(projectId);
        return projectRepository.getProjectAsMember(projectId, userEmail).orElseThrow(() -> new ApiException(
                "not_a_member",
                "You're not a member of this project"
        ));
    }

    public boolean isAdmin(String userEmail, UUID projectId) {
        Optional<String> adminId = projectRepository.getProjectWorkspaceAdminId(projectId);
        return adminId.isPresent() && adminId.get().equals(userEmail);
    }

    public boolean isMember(String userEmail, UUID projectId) {
        return memberRepository.existsByUserEmailEqualsAndProjectIdEquals(userEmail, projectId);
    }

}
