import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";
import { changePassword } from "../../api/user-api/changePassword.js";
import { getUserError } from "../../errors/user_errors.js";

import { validatePassword } from "../../errors/validation.js";
import useErrorContext from "../../hooks/useErrorContext.js";

const ChangePasswordPopup = ({ close }) => {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);
  const [errorRepPassword, setErrorRepPassword] = useState(false);

  const { pushError } = useErrorContext();

  const validate = () => {
    const passwordValidationResult = validatePassword(password);
    const newPasswordValidationResult = validatePassword(newPassword);
    const repPasswordValidationResult = repeatedPassword === newPassword ? "passed" : "Пароли не совпадают";


    if (passwordValidationResult !== "passed") {
      setErrorPassword(passwordValidationResult);
      return false;
    }
    if (newPasswordValidationResult !== "passed") {
      setErrorNewPassword(newPasswordValidationResult);
      return false;
    }
    if (repPasswordValidationResult !== "passed") {
      setErrorRepPassword(repPasswordValidationResult);
      return false;
    }
    return true;
  }

  const handleError = (e) => {
    const error_message = getUserError(e?.response?.data?.error_code);
    pushError(error_message, "error");
}

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
    if (!validate()) return;
    if (newPassword !== repeatedPassword) return;
    changePassword(password, newPassword)
      .then((response) => {
        close(nameButtonClicked);
      })
      .catch((e) => {
        handleError(e);
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
          error={errorPassword}
          clearError={() => setErrorPassword("")}
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
          error={errorNewPassword}
          clearError={() => setErrorNewPassword("")}
        />
        <Input
          placeholder="••••••••"
          typeOfInput="repeatedPassword"
          data={repeatedPassword}
          setData={setRepeatedPassword}
          error={errorRepPassword}
          clearError={() => setErrorRepPassword("")}
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
