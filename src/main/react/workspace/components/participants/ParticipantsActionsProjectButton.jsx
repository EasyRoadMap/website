import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";
import ButtonDotsSVG from "../../../assets/buttonDots.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import { removeParticipantFromProjectProps } from "../popup/PopupsData.jsx";

import { useProjectInfo } from "../../hooks/useProject.jsx";
import useProjectContext from "../../hooks/useProjectContext.js";

const ParticipantActionsButton = ({ participant }) => {
  const [listShowed, setListShowed] = useState(false);

  const { projectContext } = useProjectContext();
  const { KickMember } = useProjectInfo();

  const onCloseRemoveParticipantPopup = (...params) => {
    if (params[0] !== "yes" || !projectContext?.id || !participant?.user?.email)
      return;
    KickMember(projectContext.id, participant.user.email);
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

  const buttons = [
    {
      icon: DeleteSVG,
      text: "Исключить",
      callback: () => openRemoveParticipantPopup(),
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
        <div className={styles.dots} onClick={toggleListvisibility}>
          <ButtonDotsSVG />
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
