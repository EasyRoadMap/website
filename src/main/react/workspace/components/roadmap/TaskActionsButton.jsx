import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState, useEffect } from "react";
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
  askForDeleteTaskProps
} from "../popup/PopupsData.jsx";
import ChangeTaskPopup from "../popup/ChangeTaskPopup.jsx";

import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";

const statusToInt = {
  "in_progress": 0,
  "planned": 1,
  "done": 2
}

const TaskActionsButton = ({ task }) => {
  const [listShowed, setListShowed] = useState(false);

  const { workspaceContext } = useWorkspaceContext();
  const { chosenStage } = useRoadmapContext();
  const { ChangeTask, DeleteTask } = useRoadmapInfo();

  const onCloseChangeTaskPopup = (...params) => {
    if (params?.[0]?.button === "change" && chosenStage && task?.id && params?.[0]?.status && params?.[0]?.name) {
      ChangeTask(chosenStage, task?.id, statusToInt[params?.[0]?.status], params?.[0]?.name, params?.[0]?.description, params?.[0]?.deadline);
      // params?.[0]?.attachment
    }
  }
  const onCloseDeleteTaskPopup = (...params) => {
    if (params?.[0] === "yes" && chosenStage && task?.id) {
      DeleteTask(chosenStage, task?.id);
    }
  }

  const setStatus = (status) => {
    console.debug("task information", task);
    if (!(chosenStage && task?.id && task?.name)) return;
    ChangeTask(chosenStage, task.id, statusToInt[status], task.name)
  }

  const popupManager = usePopupManager();
  const openChangeTaskPopup = () => {
    console.debug("task info", task);
    popupManager.open(Popup, {
      popup: {
        component: ChangeTaskPopup,
        props: {
          task: {
            name: task?.name,
            description: task?.description,
            status: task?.status,
            deadline: task?.deadline_at
          }
        }
      },
      onClose: onCloseChangeTaskPopup,
    });
  };
  const openDeleteTaskPopup = () => {
    console.debug("task info", task);
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: askForDeleteTaskProps(task),
      },
      onClose: onCloseDeleteTaskPopup,
    });
  };

  const buttons = [
    {
      icon: DoneTaskIcon,
      text: "Отметить готовой",
      callback: () => setStatus("done"),
    },
    {
      icon: ProgressTaskIcon,
      text: "Отметить выполняемой",
      callback: () => setStatus("in_progress"),
    },
    {
      icon: PlannedTaskIcon,
      text: "Отметить запланированной",
      callback: () => setStatus("planned"),
    },
    {
      icon: EditSVG,
      text: "Редактировать задачу",
      callback: () => openChangeTaskPopup(),
    },
    {
      icon: DeleteSVG,
      text: "Удалить задачу",
      callback: () => openDeleteTaskPopup(),
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
