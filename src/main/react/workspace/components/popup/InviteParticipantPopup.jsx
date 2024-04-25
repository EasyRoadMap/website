import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

const InviteParticipantPopup = ({
    close
}) => {
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");

    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "invite") return;
        close({
            button: nameButtonClicked,
            email: email,
            role: position 
        });
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
                <Input data={email}
                       setData={setEmail}
                       placeholder={"user@example.com"}
                       typeOfInput={"email"}
                />
                <Input data={position}
                       setData={setPosition}
                       placeholder={"Введите должность"}
                       typeOfInput={"position"}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Пригласить" type="filledAccent" callback={() => handleClick("invite")}/>
            </div>
        </div>
    );
}

export default InviteParticipantPopup;