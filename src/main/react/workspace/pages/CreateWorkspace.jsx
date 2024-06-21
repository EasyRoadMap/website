import Header from "../components/header/Header.jsx";
import CreateWorkspacePageSVG from "../../assets/createWorkspacePageSVG.jsx";
import Button from "../components/UI/Button.jsx";
import styles from "./createWorkspace.module.css";
import BaseCreateWorkspace from "./BaseCreateWorkspace.jsx";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import useUserContext from "../hooks/useUserContext.js";

import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import CreateWorkspacePopup from "../components/popup/CreateWorkspacePopup.jsx";

const CreateWorkspace = ({ type }) => {
  const { firstAnswerReceived } = useUserContext();
  console.debug("ws info", firstAnswerReceived);
  const { CreateWorkspace } = useWorkspaceInfo();

  const popupManager = usePopupManager();

  const onCreateWorkspace = (...params) => {
    if (params?.[0]?.button === "create")
      CreateWorkspace(params?.[0]?.name, params?.[0]?.description);
  };

  const openCreateWorkspacePopup = (...params) => {
    popupManager.open(Popup, {
      popup: {
        component: CreateWorkspacePopup,
      },
      onClose: onCreateWorkspace,
    });
  };

  const typeCreate = {
    workspace: {
      name: "У Вас нет рабочих областей",
      description: "Создайте рабочую область и начните работу прямо сейчас!",
      textButton: "Создать рабочую область +",
    },
    project: {
      name: "Здесь пока нет проектов",
      description: "Создайте первый проект и начните работу прямо сейчас!",
      textButton: "Создать проект +",
    },
  };

  return (
    <>
      <BaseCreateWorkspace>
        <CreateWorkspacePageSVG className={styles.createWorkspaceSVG} />
        <div className={styles.containerWithGaps}>
          <h1 className={styles.title}>{typeCreate.workspace.name}</h1>
          <span className={styles.description}>
            {typeCreate.workspace.description}
          </span>
        </div>
        <Button
          text={typeCreate.workspace.textButton}
          type="filledAccent"
          callback={openCreateWorkspacePopup}
          style={{ height: "48px", padding: "0", fontSize: "18px" }}
        />
      </BaseCreateWorkspace>
    </>
  );
};

export default CreateWorkspace;
