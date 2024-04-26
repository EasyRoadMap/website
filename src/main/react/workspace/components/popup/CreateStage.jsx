import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

const CreateStagePopup = ({ close }) => {
  const [name, setName] = useState("");

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create")
      return;
    close({ button: nameButtonClicked, name: name });
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Создать этап</h1>
        <div className={styles.description}>Создайте новый этап</div>
      </div>

      <div className={styles.containerWithGaps}>
        <Input
          data={name}
          setData={setName}
          placeholder={"Введите название"}
          typeOfInput={"nameRegion"}
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
          text="Создать"
          type="filledAccent"
          callback={() => handleClick("create")}
          style={{ width: "131px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default CreateStagePopup;
