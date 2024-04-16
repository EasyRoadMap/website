import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const DeleteAccountPopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Удалить аккаунт
            </h1>
            <div className={styles.description}>
                Для удаления аккаунта подтвердите личность вводом текущего пароля от него.
            </div>
            <input type="text" />

            {/* checkbox */}

            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Создать" type="filledAccent" callback={() => handleClick("create")}/>
            </div>
        </div>
    );
}

export default DeleteAccountPopup;