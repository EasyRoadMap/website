import SidebarProjectButton from "./SidebarProjectButton.jsx";
import styles from "./styles.module.css";

const SidebarProjects = ({ projects, blocks, places }) => {
  console.log("PROJECTS");
  console.log(projects);
  return (
      <>{
        (projects) &&
        <div className={styles.project}>
          {projects.map((project, i) => {
            return (
              <button key={i} className={styles.projectButton}>
                <SidebarProjectButton project={project} blocks={blocks} places={places} />
              </button>
            );
          })}
        </div>
      }</>
  );
};

export default SidebarProjects;
