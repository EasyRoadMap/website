import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import CameraSVG from "../../assets/cameraSVG.jsx";
import { useState, useEffect } from "react";
import Button from "./UI/Button.jsx";

import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const WorkspaceMainInfo = ({ logo, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);

  const { updateInfo } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  useEffect(() => {
    console.debug("initialValues", initialValues.workspace);
  }, []);

  const avatarClassName = logo?.default
    ? [styles.logo, styles.pixelAvatar].join(" ")
    : styles.logo;

  const isDataChanged = () => {
    if (!initialValues?.name && name === "") return false;
    if (!initialValues?.description && description === "") return false;

    return !(
      name === initialValues?.name &&
      description === initialValues?.description
    )
  }

  const changeData = () => {
    if (!workspaceContext?.id) return;
    if (
      name !== initialValues?.name ||
      description !== initialValues?.description
    ) {
      updateInfo(workspaceContext.id, name, description);
    } 
  }

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
            />
            <TextField
              title="Описание"
              placeholder="Описание рабочей области"
              data={description}
              setData={setDescription}
              loading={!initialValues.name}
            />
            {
            isDataChanged() &&
            <Button
              text={"Сохранить изменения"}
              type={"filledAccent"}
              callback={changeData}
            />
          }
          </div>
        </div>
      </section>
    );
  }
};

export default WorkspaceMainInfo;
