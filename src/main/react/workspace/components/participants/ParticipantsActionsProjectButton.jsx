import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";
import ChangePositionPopup from "../popup/ChangePositionPopup.jsx";
import ButtonDotsSVG from "../../../assets/buttonDots.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import EditSVG from "../../../assets/editSVG.jsx";
import { removeParticipantFromProjectProps } from "../popup/PopupsData.jsx";

import { useProjectInfo } from "../../hooks/useProject.jsx";
import useProjectContext from "../../hooks/useProjectContext.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const ParticipantActionsButton = ({ participant }) => {
  const [listShowed, setListShowed] = useState(false);

  const { projectContext } = useProjectContext();
  const { KickMember, UpdateMemberRole } = useProjectInfo();
  const { workspaceContext } = useWorkspaceContext();

  const onCloseRemoveParticipantPopup = (...params) => {
    if (params[0] !== "yes" || !projectContext?.id || !participant?.user?.email)
      return;
    KickMember(projectContext.id, participant.user.email);
  };

  const onCloseUpdateParticipantRolePopup = (...params) => {
    if (
      params[0].button !== "change" ||
      !workspaceContext?.id ||
      !projectContext?.id ||
      !participant?.user?.email ||
      !params[0].role
    )
      return;
    UpdateMemberRole(projectContext.id, participant.user.email, params[0].role);
  };

  const popupManager = usePopupManager();

  const openRemoveParticipantPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: removeParticipantFromProjectProps(participant?.user?.name),
      },
      onClose: onCloseRemoveParticipantPopup,
    });
  };

  const openChangePositionPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: ChangePositionPopup,
        props: {
          participant: participant,
        },
      },
      onClose: onCloseUpdateParticipantRolePopup,
    });
  };

  const buttons = [
    {
      icon: DeleteSVG,
      text: "Исключить",
      callback: () => openRemoveParticipantPopup(),
    },
    {
      icon: EditSVG,
      text: "Изменить должность",
      callback: () => openChangePositionPopup(),
    },
  ];

  const toggleListvisibility = () => {
    setListShowed((prev) => !prev);
  };

  return (
    <OutsideAlerter
      callback={() => setListShowed(false)}
      style={{ width: "fit-content" }}
    >
      <div className={styles.dotsWrapper}>
        <div className={styles.dotsContainer}>
          <div className={styles.dots} onClick={toggleListvisibility}>
            <ButtonDotsSVG style={{ width: "16px", height: "16px" }} />
          </div>
        </div>
        <DropdownActionsList
          buttons={buttons}
          showed={listShowed}
          close={() => setListShowed(false)}
          style={{ display: listShowed ? "block" : "none" }}
        />
      </div>
    </OutsideAlerter>
  );
};

export default ParticipantActionsButton;
