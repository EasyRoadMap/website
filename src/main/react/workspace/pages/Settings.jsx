import Base from "./Base.jsx";
import Accent from "../components/UI/Accent.jsx";
import ThemeChange from "../components/UI/ThemeChange.jsx";

import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import DeleteWorkspacePopup from "../components/popup/DeleteWorkspacePopup.jsx";


const Settings = () => {
  const { DeleteWorkspace } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  const popupManager = usePopupManager();
  const onCloseDeleteWorkspacePopup = (...params) => {
    console.log(params?.[0]);
    if (params?.[0]?.button === "delete") {
      DeleteWorkspace(workspaceContext.id, params?.[0].password);
    }
  }

  const openDeleteWorkspacePopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: DeleteWorkspacePopup,
        props: {workspace: workspaceContext?.info?.name}
      },
      onClose: onCloseDeleteWorkspacePopup,
    });
  };

  return (
    <Base>
      <ThemeChange />
      <Accent accent={workspaceContext?.appearance?.accent_color} />
      <DeleteBlock typeButton="deleteWorkspace" callback={openDeleteWorkspacePopup} />
    </Base>
  );
};

export default Settings;
