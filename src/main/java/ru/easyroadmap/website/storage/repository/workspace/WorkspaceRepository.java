package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.Workspace;

import java.util.UUID;

public interface WorkspaceRepository extends JpaRepository<Workspace, UUID> {

    boolean existsByIdEqualsAndAdminIdEquals(UUID workspaceId, String adminId);

}
