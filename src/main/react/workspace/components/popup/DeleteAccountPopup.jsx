import styles from "./styles.module.css";
import stylesInput from "../UI/InputCheckBox.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputCheckBox from "../UI/InputCheckbox.jsx";
import { useState } from "react";

import { validatePassword } from "../../errors/validation.js";


const DeleteAccountPopup = ({ deleteUser, close }) => {
  const [password, setPassword] = useState(null);
  const [check, setCheck] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);

  const validate = () => {
    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult !== "passed") {
      setErrorPassword(passwordValidationResult);
      return false;
    }
    return true;
  }

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "delete")
      return;
    if (!validate()) return;
    // if (nameButtonClicked === "delete") {
    //     if (check === true) {
    //         deleteUser(password,
    //             () => close({ button: nameButtonClicked }),
    //             () => {} // throw error
    //         );
    //     }
    //     else {
    //         console.log("can't delete user");
    //         close({ button: nameButtonClicked });
    //         // error
    //     }
    //     return;
    // }
    close({ button: nameButtonClicked });
  };
  return (
    <>
      <h1 className={styles.title}>Удалить аккаунт</h1>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Для удаления аккаунта подтвердите личность <br /> вводом текущего
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
          Я понимаю, что все данные аккаунта будут удалены и не могут быть
          восстановлены.
        </label>
      </div> */}
      {/* <InputCheckBox typeDescription="deleteAccount" /> */}
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
          Я понимаю, что все данные аккаунта будут <br /> удалены и не могут
          быть восстановлены.
        </label>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px", fontSize: "16px" }}
        />
        <Button
          text="Удалить аккаунт"
          type="filledAccent"
          disabled={!check}
          callback={() => handleClick("delete")}
          style={{ width: "214px", height: "40px", fontSize: "16px" }}
        />
      </div>
    </>
  );
};

export default DeleteAccountPopup;
