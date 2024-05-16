import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

import { validateRole } from "../../errors/validation.js";

const ChangePositionPopup = ({ close, participant }) => {
  const [role, setRole] = useState(participant?.role);

  const [errorRole, setErrorRole] = useState("");

  const validate = () => {
    const roleValidationResult = validateRole(role);

    if (roleValidationResult !== "passed") {
      setErrorRole(roleValidationResult);
      return false;
    }
    return true;
  }

  const avatarClassName = participant?.user?.photo?.default
    ? [styles.participantAvatar, styles.pixelAvatar].join(" ")
    : styles.participantAvatar;

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "change")
      return;
    if (!validate()) return;
    close({button: nameButtonClicked, role: role});
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Изменить должность</h1>
        <div className={styles.participantCard}>
          <div className={styles.participantCardWrapper}>
            <img src={participant?.user?.photo?.url} alt="" className={avatarClassName} />
            <div className={styles.participantCardTextWrapper}>
              <div className={styles.participantCardTitle}>
                {participant?.user?.name}
              </div>
              <div className={styles.participantCardPosition}>
                {participant?.role}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerInput}>
          <div className={styles.description}>
            Вы можете назначить должность данному <br />
            пользователю в поле ниже.
          </div>
          <Input 
            placeholder={"Введите должность"} 
            typeOfInput={"position"} 
            data={role} 
            setData={setRole}
            error={errorRole}
            clearError={() => setErrorRole("")}
          />
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Изменить"
          type="filledAccent"
          callback={() => handleClick("change")}
          style={{ width: "146px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default ChangePositionPopup;
