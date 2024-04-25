import DropdownWorkspaceButton from "./DropdownWorkspaceButton.jsx";
import DropdownWorkspaceCreateButton from "./DropdownWorspaceCreateButton.jsx";
import styles from "./styles.module.css";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateWorkspacePopup from "../popup/CreateWorkspacePopup.jsx";

const DropdownWorkspaces = ({ workspaces, createWorkspace }) => {
  console.log("workspaces");
  console.log(workspaces);

  const popupManager = usePopupManager();

  const onCreateWorkspace = (...params) => {
    if (params?.[0]?.button === "create")
      createWorkspace(params?.[0]?.name, params?.[0]?.description);
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
