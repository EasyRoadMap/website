import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import StatusCheckbox from "./StatusCheckbox.jsx";
import AddFilesField from "./AddFilesField.jsx";

const CreateTaskPopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Создать задачу
            </h1>
            <div className={styles.description}>
                Создайте задачу, покажите прогресс вашей работы пользователям.
            </div>
            <div className={styles.containerWithGaps}>
                <input type="text" />
                <input type="text" />
            </div>
            <div className={styles.containerWithGaps}>
                <div className={styles.description}>
                    Выберите статус разработки задачи.
                </div>
                <StatusCheckbox />
            </div>
            <div className={styles.containerWithGaps}>
                <div className={styles.description}>
                    По желанию можете указать дату создания задачи.
                </div>
                <input type="text" />
            </div>
            <div className={styles.containerWithGaps}>
                <div className={styles.description}>
                    Прикрепите необходимые вложения к вашей задаче.
                </div>
                <AddFilesField />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Создать" type="filledAccent" callback={() => handleClick("create")}/>
            </div>
        </div>
    );
}

export default CreateTaskPopup;