import Button from "../UI/Button.jsx";
import AvatarsList from "./AvatarsList.jsx";
import styles from "./styles.module.css";

const ProjectItem = ({
    project
}) => {
    return (
        <div className={styles.project}>
            <img src={project.avatar} alt="" className={styles.avatar}/>
            <h1 className={styles.name}>{project.name}</h1>
            <AvatarsList participants={project.participants}/>
            <Button text="Перейти" type="filledAccent" callback={project.callback}/>
        </div>
    );
}

export default ProjectItem;