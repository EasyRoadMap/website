import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const ProjectAddButton = () => {
    return (
        <div className={styles.addProject}>
            <img src="" alt="" className={styles.addLogo}/>
            <Button text="Создать новый" type="filledAccent"/>
        </div>
    );
}

export default ProjectAddButton;