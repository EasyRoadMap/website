import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const InviteParticipantPopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "invite") return;
        close(nameButtonClicked);
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Пригласить участника
            </h1>
            <div className={styles.description}>
                Введите электронную почту добавляемого пользователя ниже. Вы также можете сразу определить его должность.
            </div>
            <div className={styles.containerWithGaps}>
                <input type="text" />
                <input type="text" />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Пригласить" type="filledAccent" callback={() => handleClick("invite")}/>
            </div>
        </div>
    );
}

export default InviteParticipantPopup;