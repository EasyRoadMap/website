import React from "react";
import ProjectItem from "./ProjectItem.jsx";
import ProjectAddButton from "./ProjectAddButton.jsx";
import styles from "./styles.module.css";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import NoProjectAdmin from "./NoProjectAdmin.jsx";

const ProjectsList = () => {
  const { workspaceContext } = useWorkspaceContext();
  const projectsCount = workspaceContext?.projects?.length || 0;

  return (
    <section className={styles.projectsList}>
      {projectsCount === 0 && !workspaceContext?.is_admin && (
        <NoProjectAdmin type="workspace" />
      )}
      {workspaceContext?.projects &&
        workspaceContext.projects.map((project, i) => (
          <ProjectItem project={project} key={i} />
        ))}
      {workspaceContext?.is_admin && (
        <ProjectAddButton projectsCount={projectsCount} />
      )}
    </section>
  );
};

export default ProjectsList;
