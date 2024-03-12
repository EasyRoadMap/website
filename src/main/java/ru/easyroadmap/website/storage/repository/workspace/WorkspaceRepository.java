package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

public interface WorkspaceRepository extends JpaRepository<Workspace, String> {
}
