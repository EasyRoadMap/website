import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import InputDate from "../UI/InputDate.jsx";
import { useState } from "react";

import { validateName, validateDescription, validateDeadlineDate } from "../../errors/validation.js";

const CreateProjectPopup = ({ close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  const validate = () => {
    const nameValidationResult = validateName(name, "project");
    const descriptionValidationResult = validateDescription(description);
    const dateValidationResult = validateDeadlineDate(date);


    if (nameValidationResult !== "passed") {
      setErrorName(nameValidationResult);
      return false;
    }
    if (descriptionValidationResult !== "passed") {
      setErrorDescription(descriptionValidationResult);
      return false;
    }
    if (dateValidationResult !== "passed") {
      setErrorDate(dateValidationResult);
      return false;
    }
    return true;
  }

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create")
      return;
    if (nameButtonClicked === "cancel") {
      close({ button: nameButtonClicked, name: name, description: description, date: date });
      return;
    }
    if (!validate()) return;
    close({ button: nameButtonClicked, name: name, description: description, date: date });
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
          typeOfInput={"nameProject"}
          error={errorName}
          clearError={() => setErrorName("")}
        />
        <Input
          data={description}
          setData={setDescription}
          placeholder={"Введите описание"}
          typeOfInput={"descriptionProject"}
          error={errorDescription}
          clearError={() => setErrorDescription("")}
        />
        <InputDate data={date} setData={setDate} typeDate="endDate" loading={true} error={errorDate}
          clearError={() => setErrorDate("")} />
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
