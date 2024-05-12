import DropdownWorkspaceButton from "./DropdownWorkspaceButton.jsx";
import DropdownWorkspaceCreateButton from "./DropdownWorspaceCreateButton.jsx";
import styles from "./styles.module.css";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateWorkspacePopup from "../popup/CreateWorkspacePopup.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";

const DropdownWorkspaces = ({ workspaces, hide }) => {
  const popupManager = usePopupManager();
  const { CreateWorkspace } = useWorkspaceInfo();

  const onCreateWorkspace = (...params) => {
    if (params?.[0]?.button === "create")
      CreateWorkspace(params?.[0]?.name, params?.[0]?.description);
  };

  const openCreateWorkspacePopup = (...params) => {
    hide();
    popupManager.open(Popup, {
      popup: {
        component: CreateWorkspacePopup,
      },
      onClose: onCreateWorkspace,
    });
  };

  return (
    <div className={styles.dropdownWorkspaces}>
      <span className={styles.dropdownWorkspacesTitle}>Рабочие области</span>
      {Object.keys(workspaces ? workspaces : {})?.length !== 0 && workspaces.map((workspace, i) => {
        return <DropdownWorkspaceButton workspace={workspace} key={i} />;
      })}
      <DropdownWorkspaceCreateButton callback={openCreateWorkspacePopup}/>
    </div>
  );
};

export default DropdownWorkspaces;
