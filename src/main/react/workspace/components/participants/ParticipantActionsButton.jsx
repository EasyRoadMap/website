import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";
import ButtonDotsSVG from "../../../assets/buttonDots.jsx";
import TransferSVG from "../../../assets/transferSVG.jsx";
import EditSVG from "../../../assets/editSVG.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import {
  transferControlProps,
  removeParticipantProps,
} from "../popup/PopupsData.jsx";
import ChangePositionPopup from "../popup/ChangePositionPopup.jsx";

import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";

const ParticipantActionsButton = ({ participant }) => {
  const [listShowed, setListShowed] = useState(false);

  const { workspaceContext } = useWorkspaceContext();
  const { TransferOwnership, KickMember, UpdateMemberRole } =
    useWorkspaceInfo();

  const onCloseTransferControlPopup = (...params) => {
    if (
      params[0] !== "yes" ||
      !workspaceContext?.id ||
      !participant?.user?.email
    )
      return;
    TransferOwnership(workspaceContext.id, participant.user.email);
  };
  const onCloseRemoveParticipantPopup = (...params) => {
    if (
      params[0] !== "yes" ||
      !workspaceContext?.id ||
      !participant?.user?.email
    )
      return;
    KickMember(workspaceContext.id, participant.user.email);
  };
  const onCloseChangePositionPopup = (...params) => {
    if (
      params[0].button !== "change" ||
      !workspaceContext?.id ||
      !participant?.user?.email
    )
      return;
    UpdateMemberRole(
      workspaceContext.id,
      participant.user.email,
      params[0].role
    );
  };

  const popupManager = usePopupManager();
  const openTransferControlPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: transferControlProps(participant?.user?.name),
      },
      onClose: onCloseTransferControlPopup,
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
      onClose: onCloseChangePositionPopup,
    });
  };
  const openRemoveParticipantPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: removeParticipantProps(participant?.user?.name),
      },
      onClose: onCloseRemoveParticipantPopup,
    });
  };

  const buttons = [
    {
      icon: TransferSVG,
      text: "Передать управление",
      callback: () => openTransferControlPopup(),
    },
    {
      icon: EditSVG,
      text: "Изменить должность",
      callback: () => openChangePositionPopup(),
    },
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
        <button className={styles.dotsContainer} onClick={toggleListvisibility}>
          <div className={styles.dots}>
            <ButtonDotsSVG style={{ width: "16px", height: "16px" }} />
          </div>
        </button>

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
