package ru.easyroadmap.website.storage.repository.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.easyroadmap.website.storage.model.workspace.WorkspaceMember;

import java.util.List;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {

    List<WorkspaceMember> findAllByWorkspaceIdEquals(String workspaceId);

}
