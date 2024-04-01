import SidebarProjectButton from "./SidebarProjectButton.jsx";
import styles from "./styles.module.css";

const SidebarProjects = ({ projects, places }) => {
  return (
    <div className={styles.project}>
      {projects.map((project, i) => {
        return (
          <div key={i} className={styles.projectButton}>
            <SidebarProjectButton project={project} places={places} />
          </div>
        );
      })}
    </div>
  );
};

export default SidebarProjects;
