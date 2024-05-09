import styles from "./style.module.css";
import ProjectItem from "./ProjectItem.jsx";

const ProjectList = ({
  projects
}) => {
  return (
    <div className={styles.container} id="projects">
      {
        projects &&
        projects?.map((project) => {
          return (
            <ProjectItem 
              name={project?.info?.name}
              description={project?.info?.description}
              photo={project?.photo}
              date={project?.info?.deadline_at}
              id={project?.id}
            />
          )
        })
      }
    </div>
  );
};

export default ProjectList;
