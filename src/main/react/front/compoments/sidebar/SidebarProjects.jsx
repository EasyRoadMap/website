import SidebarProjectButton from "./SidebarProjectButton.jsx";
import styles from "./style.module.css";

const SidebarProjects = ({ projects, chosen, blocks, places }) => {
  return (
    <>
      {projects && (
        <div className={styles.project}>
          {projects.map((project, i) => {
            return (
              <button
                key={i}
                className={
                  // project?.id && project?.id === projectContext?.id
                  //   ? [styles.projectButton, styles.buttonProjectActive].join(
                  //       " "
                  //     )
                  //   : styles.projectButton
                  styles.projectButton
                }
              >
                <SidebarProjectButton
                  project={project}
                  chosen={chosen}
                  blocks={blocks}
                  places={places}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SidebarProjects;
