import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";
import ButtonDotsVerticalSVG from "../../../assets/buttonDotsVertical.jsx";
import EditSVG from "../../../assets/editSVG.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import DoneTaskIcon from "../../../assets/doneTaskIcon.jsx";
import ProgressTaskIcon from "../../../assets/progressTaskIcon.jsx";
import PlannedTaskIcon from "../../../assets/plannedTaskIcon.jsx";
import {
  removeTaskProps,
  removeParticipantProps,
} from "../popup/PopupsData.jsx";
import ChangePositionPopup from "../popup/ChangePositionPopup.jsx";

import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const TaskActionsButton = ({ task }) => {
  const [listShowed, setListShowed] = useState(false);

  const { workspaceContext } = useWorkspaceContext();

  const onCloseTransferControlPopup = (...params) =>
    console.log("TransferControlPopup has closed with:", ...params);
  const onCloseRemoveParticipantPopup = (...params) =>
    console.log("RemoveParticipantPopup has closed with:", ...params);
  const onCloseChangePositionPopup = (...params) =>
    console.log("ChangePositionPopup has closed with:", ...params);

  const popupManager = usePopupManager();
  const openTransferControlPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: removeTaskProps(task?.name),
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
      icon: DoneTaskIcon,
      text: "Отметить готовой",
      callback: () => openTransferControlPopup(),
    },
    {
      icon: ProgressTaskIcon,
      text: "Отметить выполняемой",
      callback: () => openChangePositionPopup(),
    },
    {
      icon: PlannedTaskIcon,
      text: "Отметить запланированной",
      callback: () => openChangePositionPopup(),
    },
    {
      icon: EditSVG,
      text: "Редактировать задачу",
      callback: () => openChangePositionPopup(),
    },
    {
      icon: DeleteSVG,
      text: "Удалить задачу",
      callback: () => openTransferControlPopup(),
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
          <ButtonDotsVerticalSVG className={styles.dots} />
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

export default TaskActionsButton;
