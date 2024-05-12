import SidebarProjectButton from "./SidebarProjectButton.jsx";
import styles from "./styles.module.css";
import useProjectContext from "../../hooks/useProjectContext.js";

const SidebarProjects = ({ projects, chosen, blocks, places }) => {
  console.debug("projects ISSSSSSSSSSSSSSSSSSSSSSS", projects);
  const { projectContext } = useProjectContext();
  return (
      <>{
        (projects) &&
        <div className={styles.project}>
          {projects.map((project, i) => {
            return (
              <button key={i} className={
                (project?.id && (project?.id === projectContext?.id)) ? [styles.projectButton, styles.buttonProjectActive].join(" ") : styles.projectButton
              }>
                <SidebarProjectButton project={project} chosen={chosen} blocks={blocks} places={places} />
              </button>
            );
          })}
        </div>
      }</>
  );
};

export default SidebarProjects;
