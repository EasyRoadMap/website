import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputCheckBox from "../UI/InputCheckbox.jsx";
import stylesInput from "../UI/InputCheckBox.module.css";
import { useState } from "react";
import useScreenWidth from "../../hooks/useScreenWidth.js";

import { validatePassword } from "../../errors/validation.js";

const DeleteProjectPopup = ({ project, close }) => {
  const [password, setPassword] = useState(null);
  const [check, setCheck] = useState(false);
  const screenWidth = useScreenWidth();

  const [errorPassword, setErrorPassword] = useState(false);

  const validate = () => {
    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult !== "passed") {
      setErrorPassword(passwordValidationResult);
      return false;
    }
    return true;
  };

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "delete")
      return;
    if (nameButtonClicked === "cancel") {
      close({ button: nameButtonClicked, password: password });
      return;
    }
    if (!validate()) return;
    close({ button: nameButtonClicked, password: password });
  };
  return (
    <>
      <h1 className={styles.title}>Удалить проект</h1>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Для удаления проекта{" "}
          <p className={styles.descriptionBolder}>{" " + project + " "}</p>{" "}
          подтвердите личность {screenWidth >= 605 && <br />} вводом текущего
          пароля от него.
        </div>
        <Input
          data={password}
          setData={setPassword}
          placeholder={"••••••••"}
          typeOfInput={"password"}
          error={errorPassword}
          clearError={() => setErrorPassword("")}
        />
      </div>

      {/* <div className={styles.rememberMe}>
        <input
          id="check"
          type="checkbox"
          className={styles.checkbox}
          onChange={(e) => {
            setCheck(!check);
          }}
        ></input>
        <label>
          Я понимаю, что все данные проекта будут удалены и не могут быть
          восстановлены.
        </label>
      </div> */}
      <div className={stylesInput.checkboxWrapperPrivatePolicy}>
        <input
          id="check"
          type="checkbox"
          className={stylesInput.checkbox}
          onChange={(e) => {
            setCheck(!check);
          }}
        ></input>
        <label for="check" className={stylesInput.label}>
          Я понимаю, что все данные проекта будут {screenWidth >= 530 && <br />}{" "}
          удалены и не могут быть восстановлены.
        </label>
      </div>
      {/* <InputCheckBox typeDescription="deleteProject" /> */}

      {screenWidth >= 400 && (
        <div className={styles.buttonsWrapper}>
          <Button
            text="Отмена"
            type="outlineSecondary"
            callback={() => handleClick("cancel")}
            style={{ width: "131px", height: "40px" }}
          />
          <Button
            text="Удалить проект"
            type="filledAccent"
            disabled={!check}
            callback={() => handleClick("delete")}
            style={{ width: "222px", height: "40px" }}
          />
        </div>
      )}

      {screenWidth < 400 && (
        <div className={styles.buttonsWrapper}>
          <Button
            text="Отмена"
            type="outlineSecondary"
            callback={() => handleClick("cancel")}
            style={{ width: "calc(100% - 65px)", height: "40px" }}
          />
          <Button
            text="Удалить проект"
            type="filledAccent"
            disabled={!check}
            callback={() => handleClick("delete")}
            style={{ width: "calc(100% - 65px)", height: "40px" }}
          />
        </div>
      )}
    </>
  );
};

export default DeleteProjectPopup;
