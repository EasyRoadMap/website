import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

import { validateName, validateRole } from "../../errors/validation.js";

const InviteParticipantPopup = ({ close }) => {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const [errorRole, setErrorRole] = useState(false);

  const validate = () => {
    const roleValidationResult = validateRole(position);

    if (roleValidationResult !== "passed") {
      setErrorRole(roleValidationResult);
      return false;
    }
    return true;
  }

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "invite") return;
    if (!validate()) return;
    close({
      button: nameButtonClicked,
      email: email,
      role: position,
    });
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Пригласить участника</h1>
        <div className={styles.description}>
          Введите электронную почту добавляемого <br />
          пользователя ниже. Вы также можете сразу
          <br /> определить его должность.
        </div>
      </div>

      <div className={styles.containerWithGaps}>
        <Input
          data={email}
          setData={setEmail}
          placeholder={"user@example.com"}
          typeOfInput={"email"}
        />
        <Input
          data={position}
          setData={setPosition}
          placeholder={"Введите должность"}
          typeOfInput={"position"}
          error={errorRole}
          clearError={() => setErrorRole("")}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Пригласить"
          type="filledAccent"
          callback={() => handleClick("invite")}
          style={{ width: "164px", height: "40px", fontweight: "500" }}
        />
      </div>
    </>
  );
};

export default InviteParticipantPopup;
