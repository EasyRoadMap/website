import ProjectItem from "./ProjectItem.jsx";
import ProjectAddButton from "./ProjectAddButton.jsx";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const ProjectsList = () => {
    const { workspaceContext } = useWorkspaceContext();

    return (
        <section className={styles.projectsList}>
            {workspaceContext?.projects && workspaceContext?.projects.map((project, i) => {
                return (
                    <ProjectItem project={project} key={i}/>
                );
            })}
            {
                workspaceContext?.is_admin && <ProjectAddButton />
            }
        </section>
    );
}

export default ProjectsList;