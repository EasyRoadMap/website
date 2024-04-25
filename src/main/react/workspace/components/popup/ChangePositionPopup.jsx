import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const ChangePositionPopup = ({
    close,
    participant
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "change") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Изменить должность
            </h1>
            <div className={styles.participantCard}>
                <img src="" alt="" className={styles.participantAvatar} />
                <div className={styles.participantCardTextWrapper}>
                    <div className={styles.participantCardTitle}>
                        {participant?.user?.name}
                    </div>
                    <div className={styles.participantCardPosition}>
                        {participant?.role}
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                Вы можете назначить должность данному пользователю в поле ниже.
            </div>
            <input type="text" />
            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Изменить" type="filledAccent" callback={() => handleClick("change")}/>
            </div>
        </div>
    );
}

export default ChangePositionPopup;