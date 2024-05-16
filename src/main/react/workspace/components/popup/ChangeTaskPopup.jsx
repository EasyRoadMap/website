import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import StatusCheckbox from "./StatusCheckbox.jsx";
import AddFilesField from "./AddFilesField.jsx";
import Input from "../UI/Input.jsx";
import InputDate from "../UI/InputDate.jsx";
import { useState } from "react";

import { validateName, validateDescription, validateDeadlineDate } from "../../errors/validation.js";


const ChangeTaskPopup = ({ close, task, chosenStage }) => {
  const [name, setName] = useState(task?.name);
  const [description, setDescription] = useState(task?.description);
  const [status, setStatus] = useState(task?.status ? task?.status : "planned");
  const [deadline, setDeadline] = useState(task?.deadline);
  const [files, setFiles] = useState(task?.attachments ? 
    task?.attachments?.map((attachment) => {
      return {file: attachment, url: attachment.url, id: attachment.id, type: attachment.type, name: attachment.file_name};
    })
    : []);

    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorDate, setErrorDate] = useState(false);

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
    }

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "change")
      return;
    if (!validate()) return;
    close({
      button: nameButtonClicked,
      name: name,
      description: description,
      status: status,
      deadline: deadline,
      attachment: files.map((file) => {return file.id}),
    });
  };
  return (
    <>
      <h1 className={styles.title}>Изменить задачу</h1>
      <div className={styles.description}>
        Измените задачу, покажите прогресс вашей работы пользователям.
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
          error={errorDate}
          clearError={() => setErrorDate("")} 
        />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Прикрепите необходимые вложения к вашей задаче.
        </div>
        <AddFilesField files={files} setFiles={setFiles} chosenStage={chosenStage}/>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          text="Отмена"
          type="outlineSecondary"
          callback={() => handleClick("cancel")}
          style={{ width: "131px", height: "40px" }}
        />
        <Button
          text="Изменить"
          type="filledAccent"
          callback={() => handleClick("change")}
          style={{ width: "131px", height: "40px" }}
        />
      </div>
    </>
  );
};

export default ChangeTaskPopup;
