import ProjectItem from "./ProjectItem.jsx";
import ProjectAddButton from "./ProjectAddButton.jsx";
import styles from "./styles.module.css";

const ProjectsList = () => {
    const projects = [
        {avatar: "", name: "Проект 1", participants: [], callback: () => {}},
        {avatar: "", name: "Проект 2", participants: [], callback: () => {}},
        {avatar: "", name: "Проект 3", participants: [], callback: () => {}},
        {avatar: "", name: "Проект 4", participants: [], callback: () => {}},
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