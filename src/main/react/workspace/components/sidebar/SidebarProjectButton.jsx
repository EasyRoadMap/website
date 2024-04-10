import styles from "./styles.module.css";

const SidebarProjectButton = ({ project, places }) => {
  return (
    <button onClick={project.toProjects} className={styles.projectdiv}>
      <img src={project.avatar} alt="" className={styles.avatar} />
      <span className={styles.name}>{project.name}</span>
      {project.chosen && (
        <>
          <hr />
          <div className={styles.placesInProject}>
            {places.map((place, i) => {
              return <span>{place}</span>;
            })}
          </div>
        </>
      )}
    </button>
  );
};

export default SidebarProjectButton;
