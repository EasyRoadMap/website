import styles from "./styles.module.css";
import AddProjectSVG from "../../../assets/AddProject.jsx";
import Button from "../UI/Button.jsx";

const ProjectAddButton = () => {
  return (
    <div className={styles.addProject}>
      <div className={styles.addLogo}>
        <AddProjectSVG />
      </div>
      <Button text="Создать новый" type="filledAccent" />
    </div>
  );
};

export default ProjectAddButton;
