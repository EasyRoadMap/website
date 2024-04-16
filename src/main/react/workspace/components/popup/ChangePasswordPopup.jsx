import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const ChangePasswordPopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "change-password") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Изменить пароль
            </h1>
            <div className={styles.containerWithGaps}>
                <div className={styles.description}>
                    Для изменения пароля сначала введите текущий.
                </div>
                <input type="text" />
            </div>
            <div className={styles.containerWithGaps}>
                <div className={styles.description}>
                    Придумайте новый пароль для входа в аккаунт.
                </div>
                <input type="text" />
                <input type="text" />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Изменить пароль" type="filledAccent" callback={() => handleClick("change-password")}/>
            </div>
        </div>
    );
}

export default ChangePasswordPopup;