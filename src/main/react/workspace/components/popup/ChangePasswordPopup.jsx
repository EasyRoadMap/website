import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";
import { changePassword } from "../../api/user-api/changePassword.js";

const ChangePasswordPopup = ({ close }) => {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  const handleClick = (nameButtonClicked) => {
    if (
      nameButtonClicked !== "cancel" &&
      nameButtonClicked !== "change-password"
    )
      return;
    if (nameButtonClicked === "cancel") {
      close(nameButtonClicked);
      return;
    }
    if (newPassword !== repeatedPassword) return;
    changePassword(password, newPassword)
      .then((response) => {
        close(nameButtonClicked);
      })
      .catch((e) => {
        console.log("response error");
        return;
      });
  };
  return (
    <>
      <h1 className={styles.title}>Изменить пароль</h1>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Для изменения пароля сначала введите текущий.
        </div>
        <Input
          placeholder="••••••••"
          typeOfInput="password"
          data={password}
          setData={setPassword}
        />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Придумайте новый пароль для входа в аккаунт.
        </div>
        <Input
          placeholder="••••••••"
          typeOfInput="newPassword"
          data={newPassword}
          setData={setNewPassword}
        />
        <Input
          placeholder="••••••••"
          typeOfInput="repeatedPassword"
          data={repeatedPassword}
          setData={setRepeatedPassword}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Изменить пароль"
          type="filledAccent"
          callback={() => handleClick("change-password")}
          style={{ width: "222px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default ChangePasswordPopup;
