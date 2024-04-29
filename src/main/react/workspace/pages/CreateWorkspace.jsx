import Header from "../components/header/Header.jsx";
import CreateWorkspacePageSVG from "../../assets/createWorkspacePageSVG.jsx";
import Button from "../components/UI/Button.jsx";
import styles from "./createWorkspace.module.css";

const CreateWorkspace = ({}) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <CreateWorkspacePageSVG />
        <div className={styles.containerWithGaps}>
          <h1 className={styles.title}>У Вас нет рабочих областей</h1>
          <span className={styles.description}>
            Создайте рабочую область и начните работу прямо сейчас!
          </span>
        </div>
        <Button
          text="Создать рабочую область +"
          type="filledAccent"
          callback={() => handleClick("save")}
          style={{ width: "345px", height: "48px", padding: "0" }}
        />
      </div>
    </>
  );
};

export default CreateWorkspace;
