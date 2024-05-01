import Header from "../components/header/Header.jsx";
import CreateWorkspacePageSVG from "../../assets/createWorkspacePageSVG.jsx";
import Button from "../components/UI/Button.jsx";
import styles from "./createWorkspace.module.css";

import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import CreateWorkspacePopup from "../components/popup/CreateWorkspacePopup.jsx";

const CreateWorkspace = ({}) => {
  const { CreateWorkspace} = useWorkspaceInfo();

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

  return (
    <>
      <Header />
      <div className={styles.container}>
        <CreateWorkspacePageSVG />
        <div className={styles.containerWithGaps}>
          <h1 className={styles.title}>У Вас нет рабочих областей</h1>
          <span className={styles.description}>
            Создайте рабочую область и начните работу прямо сейчас!
          </span>
        </div>
        <Button
          text="Создать рабочую область +"
          type="filledAccent"
          callback={openCreateWorkspacePopup}
          style={{ width: "345px", height: "48px", padding: "0" }}
        />
      </div>
    </>
  );
};

export default CreateWorkspace;
