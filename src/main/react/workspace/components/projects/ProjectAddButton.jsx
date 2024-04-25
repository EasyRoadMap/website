import styles from "./styles.module.css";
import AddProjectSVG from "../../../assets/AddProject.jsx";
import Button from "../UI/Button.jsx";
import { useProjectInfo } from "../../hooks/useProject.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateProjectPopup from "../popup/CreateProjectPopup.jsx";

const ProjectAddButton = () => {
  const { CreateProject } = useProjectInfo();
  const { workspaceContext } = useWorkspaceContext();

  const popupManager = usePopupManager();

  const onCreateProject = (...params) => {
    if (params?.[0]?.button === "create" && workspaceContext?.id && params?.[0]?.name)
    CreateProject(workspaceContext?.id, params?.[0]?.name, params?.[0]?.description, params?.[0]?.date);
  };

  const openCreateProjectPopup = (...params) => {
    popupManager.open(Popup, {
      popup: {
        component: CreateProjectPopup,
      },
      onClose: onCreateProject,
    });
  };

  return (
    <div className={styles.addProject}>
      <div className={styles.addLogo}>
        <AddProjectSVG />
      </div>
      <Button text="Создать новый" type="filledAccent" callback={openCreateProjectPopup}/>
    </div>
  );
};

export default ProjectAddButton;
