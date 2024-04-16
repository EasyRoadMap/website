import ProjectItem from "./ProjectItem.jsx";
import ProjectAddButton from "./ProjectAddButton.jsx";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
    const navigate = useNavigate();

    const projects = [
        {avatar: "", name: "Проект 1", participants: [], callback: () => {navigate("/workspace/project")}},
    ];

    return (
        <section className={styles.projectsList}>
            {projects.map((project, i) => {
                return (
                    <ProjectItem project={project} key={i}/>
                );
            })}
            <ProjectAddButton />
        </section>
    );
}

export default ProjectsList;