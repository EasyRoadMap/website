import styles from "./styles.module.css";
import AddPersonSVG from "../../../assets/addPerson.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import InviteParticipantPopup from "../popup/InviteParticipantPopup.jsx";

import { sendInvite } from "../../api/workspace-api/sendInvite.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
const AddParticipantButton = () => {
  const popupManager = usePopupManager();
  const { workspaceContext } = useWorkspaceContext();

  const onSendInvite = (...params) => {
    const email = params[0].email;
    const role = params[0].role;
    const button = params[0].button;

    if (button !== "invite" || !email || !role || !workspaceContext?.id) return;
    console.log("sending invite", params);
    sendInvite(workspaceContext.id, email, role);
  };

  const openSendInvitePopup = (...params) => {
    popupManager.open(Popup, {
      popup: {
        component: InviteParticipantPopup,
      },
      onClose: onSendInvite,
    });
  };

  return (
    <button className={styles.addButton} onClick={openSendInvitePopup}>
      {/* add icon */}
      <div className={styles.addLogo}>
        <AddPersonSVG />
      </div>
      <div className={styles.addUser}>Добавить участника</div>
    </button>
  );
};

export default AddParticipantButton;
