import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const CreateWorkspacePopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Создать рабочую область
            </h1>
            <div className={styles.description}>
                Создайте новую рабочую область для будущих проектов и начинайте работу.
            </div>
            <div className={styles.containerWithGaps}>
                <input type="text" />
                <input type="text" />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Создать" type="filledAccent" callback={() => handleClick("create")}/>
            </div>
        </div>
    );
}

export default CreateWorkspacePopup;