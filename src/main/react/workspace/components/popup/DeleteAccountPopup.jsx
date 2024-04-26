import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputCheckBox from "../UI/InputCheckbox.jsx";
import { useState } from "react";

const DeleteAccountPopup = ({ deleteUser, close }) => {
  const [password, setPassword] = useState(null);
  const [check, setCheck] = useState(false);

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "delete")
      return;
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
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Удалить аккаунт</h1>
        <div className={styles.description}>
          Для удаления аккаунта подтвердите личность <br /> вводом текущего
          пароля от него.
        </div>
      </div>

      <Input
        data={password}
        setData={setPassword}
        placeholder={"••••••••"}
        typeOfInput={"password"}
      />

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
      <InputCheckBox />

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Удалить аккаунт"
          type="filledAccent"
          disabled={!check}
          callback={() => handleClick("delete")}
          style={{ width: "214px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default DeleteAccountPopup;
