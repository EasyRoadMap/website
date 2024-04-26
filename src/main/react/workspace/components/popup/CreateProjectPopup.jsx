import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputDate from "../UI/InputDate.jsx";
import { useState } from "react";

const CreateProjectPopup = ({ close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create")
      return;
    close({ button: nameButtonClicked, name: name, description: description });
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Создать проект</h1>
        <div className={styles.description}>
          Создайте новый проект и начинайте работу.
        </div>
      </div>

      <div className={styles.containerWithGaps}>
        <Input
          data={name}
          setData={setName}
          placeholder={"Введите название"}
          typeOfInput={"nameRegion"}
        />
        <Input
          data={description}
          setData={setDescription}
          placeholder={"Введите описание"}
          typeOfInput={"descriptionRegion"}
        />
        <InputDate typeDate="endDate" />
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

export default CreateProjectPopup;
