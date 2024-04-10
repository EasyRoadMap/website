import SidebarProjectButton from "./SidebarProjectButton.jsx";
import styles from "./styles.module.css";

const SidebarProjects = ({ projects, places }) => {
  return (
    <div className={styles.project}>
      {projects.map((project, i) => {
        return (
          <button key={i} className={styles.projectButton}>
            <SidebarProjectButton project={project} places={places} />
          </button>
        );
      })}
    </div>
  );
};

export default SidebarProjects;
