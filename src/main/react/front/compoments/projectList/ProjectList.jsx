import styles from "./style.module.css";
import ProjectItem from "./ProjectItem.jsx";

const ProjectList = () => {
  return (
    <div className={styles.container}>
      <ProjectItem />
    </div>
  );
};

export default ProjectList;
