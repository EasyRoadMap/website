import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import StatusCheckbox from "./StatusCheckbox.jsx";
import AddFilesField from "./AddFilesField.jsx";
import Input from "../UI/Input.jsx";
import InputDate from "../UI/InputDate.jsx";

const CreateTaskPopup = ({ close }) => {
  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create")
      return;
    close(nameButtonClicked);
  };
  return (
    <>
      <h1 className={styles.title}>Создать задачу</h1>
      <div className={styles.description}>
        Создайте задачу, покажите прогресс вашей работы пользователям.
      </div>
      <div className={styles.containerWithGaps}>
        <Input placeholder="Введите название" typeOfInput="nameTask" />
        <Input placeholder="Введите описание" typeOfInput="descriptionTask" />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Выберите статус разработки задачи.
        </div>
        <StatusCheckbox />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          По желанию можете указать дату создания задачи.
        </div>
        <InputDate />
      </div>
      <div className={styles.containerWithGaps}>
        <div className={styles.description}>
          Прикрепите необходимые вложения к вашей задаче.
        </div>
        <AddFilesField />
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

export default CreateTaskPopup;
