import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import StatusCheckbox from "./StatusCheckbox.jsx";
import AddFilesField from "./AddFilesField.jsx";
import Input from "../UI/Input.jsx";
import InputDate from "../UI/InputDate.jsx";
import PopupBase from "./PopupBase.jsx";
import { useState, useEffect } from "react";

import {
  validateName,
  validateDescription,
  validateDeadlineDate,
} from "../../errors/validation.js";

const CreateTaskPopup = ({ close, chosenStage }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planned");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validate = () => {
    const nameValidationResult = validateName(name, "task");
    const descriptionValidationResult = validateDescription(description);
    const dateValidationResult = validateDeadlineDate(deadline);

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
  };

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create")
      return;
    if (nameButtonClicked === "cancel") {
      close({
        button: nameButtonClicked,
        name: name,
        description: description,
        status: status,
        deadline: deadline,
        attachment: files.map((file) => {
          return file.id;
        }),
      });
      return;
    }
    if (!validate()) return;
    close({
      button: nameButtonClicked,
      name: name,
      description: description,
      status: status,
      deadline: deadline,
      attachment: files.map((file) => {
        return file.id;
      }),
    });
  };
  return (
    <>
      <h1 className={styles.title}>Создать задачу</h1>
      <div className={styles.description}>
        Создайте задачу, покажите прогресс вашей работы пользователям.
      </div>
      <div className={styles.containerWithGaps}>
        <Input
          placeholder="Введите название"
          typeOfInput="nameTask"
          data={name}
          setData={setName}
          error={errorName}
          clearError={() => setErrorName("")}
        />
        <Input
          placeholder="Введите описание"
          typeOfInput="descriptionTask"
          data={description}
          setData={setDescription}
          error={errorDescription}
          clearError={() => setErrorDescription("")}
        />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Выберите статус разработки задачи.
        </div>
        <StatusCheckbox status={status} setStatus={setStatus} />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          По желанию можете указать дату завершения задачи.
        </div>
        <InputDate
          data={deadline}
          setData={setDeadline}
          typeDate={"deadlineDate"}
          loading={true}
          error={errorDate}
          clearError={() => setErrorDate("")}
        />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Прикрепите необходимые вложения к вашей задаче.
        </div>

        <AddFilesField
          files={files}
          setFiles={setFiles}
          chosenStage={chosenStage}
        />
      </div>
      {screenWidth >= 400 && (
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
            text="Создать"
            type="filledAccent"
            callback={() => handleClick("create")}
            style={{ width: "calc(100% - 65px)", height: "40px" }}
          />
        </div>
      )}
    </>
  );
};

export default CreateTaskPopup;
