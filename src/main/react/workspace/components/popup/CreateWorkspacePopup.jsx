import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";
import useScreenWidth from "../../hooks/useScreenWidth.js";

import { validateName, validateDescription } from "../../errors/validation.js";

const CreateWorkspacePopup = ({ close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);

  const screenWidth = useScreenWidth();

  const validate = () => {
    const nameValidationResult = validateName(name, "workspace");
    const descriptionValidationResult = validateDescription(description);

    if (nameValidationResult !== "passed") {
      setErrorName(nameValidationResult);
      return false;
    }
    if (descriptionValidationResult !== "passed") {
      setErrorDescription(descriptionValidationResult);
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
      });
      return;
    }
    if (!validate()) return;
    close({ button: nameButtonClicked, name: name, description: description });
  };
  return (
    <>
      <div className={styles.containerWithGaps}>
        <h1 className={styles.title}>Создать рабочую область</h1>
        <div className={styles.description}>
          Создайте новую рабочую область для будущих <br />
          проектов и начинайте работу.
        </div>
      </div>

      <div className={styles.containerWithGaps}>
        <Input
          data={name}
          setData={setName}
          placeholder={"Введите название"}
          typeOfInput={"nameRegion"}
          error={errorName}
          clearError={() => setErrorName("")}
        />
        <Input
          data={description}
          setData={setDescription}
          placeholder={"Введите описание"}
          typeOfInput={"descriptionRegion"}
          error={errorDescription}
          clearError={() => setErrorDescription("")}
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

export default CreateWorkspacePopup;
