import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import ButtonDotsSVG from "../../../assets/buttonDots.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";

import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";

import useUserContext from "../../hooks/useUserContext.js";

const ParticipanInviteActionsButton = ({ participant }) => {
  const [listShowed, setListShowed] = useState(false);
  const { AbortInvite } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();
  const { userContext } = useUserContext();

  const removeInvite = () => {
    AbortInvite(workspaceContext.id, participant.user.email);
  };

  const buttons = [
    {
      icon: DeleteSVG,
      text: "Отменить приглашение",
      callback: () => removeInvite(),
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

export default ParticipanInviteActionsButton;
