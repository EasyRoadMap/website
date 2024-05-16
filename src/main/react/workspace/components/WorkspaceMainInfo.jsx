import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import CameraSVG from "../../assets/cameraSVG.jsx";
import { useState, useEffect } from "react";
import Button from "./UI/Button.jsx";

import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

import { validateName, validateDescription } from "../errors/validation.js";

const WorkspaceMainInfo = ({ logo, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);

  const { updateInfo } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);


  const avatarClassName = logo?.default
    ? [styles.logo, styles.pixelAvatar].join(" ")
    : styles.logo;

  const isDataChanged = () => {
    if (!initialValues?.name && name === "") return false;
    if (!initialValues?.description && description === "") return false;

    return !(
      name === initialValues?.name && description === initialValues?.description
    );
  };

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
  }

  const changeData = () => {
    if (!workspaceContext?.id) return;
    if (!validate()) return;
    if (
      name !== initialValues?.name ||
      description !== initialValues?.description
    ) {
      updateInfo(workspaceContext.id, name, description);
    }
  };

  if (initialValues) {
    return (
      <section className={styles.section}>
        <span className={styles.title}>Основная информация</span>
        <div className={styles.info}>
          <div className={styles.projectAvatar}>
            <img src={logo?.url} alt="" className={avatarClassName} />
            <div className={styles.projectAvatarWrapper}>
              <div className={styles.UserAvatarPlaceholder}>
                <CameraSVG />
              </div>
            </div>
          </div>
          <div className={styles.infoDiscription}>
            <TextField
              title="Название"
              placeholder="Название рабочей области"
              data={name}
              setData={setName}
              loading={!initialValues.name}
              error={errorName}
              clearError={() => setErrorName("")}
            />
            <TextField
              title="Описание"
              placeholder="Описание рабочей области"
              type="textarea"
              data={description}
              setData={setDescription}
              loading={!initialValues.name}
              error={errorDescription}
              clearError={() => setErrorDescription("")}
            />
            {isDataChanged() && (
              <Button
                text={"Сохранить изменения"}
                type={"filledAccent"}
                callback={changeData}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default WorkspaceMainInfo;
