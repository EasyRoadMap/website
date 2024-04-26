import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputCheckBox from "../UI/InputCheckbox.jsx";
import { useState } from "react";

const DeleteWorkspacePopup = ({ workspace, close }) => {
  const [password, setPassword] = useState(null);
  const [check, setCheck] = useState(false);

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "delete")
      return;
    close({ button: nameButtonClicked, password: password });
  };
  return (
    <>
      <h1 className={styles.title}>Удалить рабочую область</h1>
      <div className={styles.description}>
        Для удаления рабочей области{" "}
        <span className={styles.descriptionBolder}>
          {" " + workspace + " "}
        </span>{" "}
        подтвердите личность <br />
        вводом текущего пароля от него.
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
          Я понимаю, что все данные рабочей области будут удалены и не могут
          быть восстановлены.
        </label>
      </div> */}
      <InputCheckBox typeDescription="deleteWorkspace" />

      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Удалить рабочую область"
          type="filledAccent"
          disabled={!check}
          callback={() => handleClick("delete")}
          style={{ width: "214px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default DeleteWorkspacePopup;
