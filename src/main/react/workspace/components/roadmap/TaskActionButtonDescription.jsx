import styles from "./styles.module.css";
import DropdownActionsList from "../UI/DropdownActionsList.jsx";
import { useState, useEffect } from "react";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import AlertPopup from "../popup/AlertPopup.jsx";

import EditSVG from "../../../assets/editSVG.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import CloseTaskActionButtonSVG from "../../../assets/closeTaskActionButtonSVg.jsx";
import DoneTaskIcon from "../../../assets/doneTaskIcon.jsx";
import ProgressTaskIcon from "../../../assets/progressTaskIcon.jsx";
import PlannedTaskIcon from "../../../assets/plannedTaskIcon.jsx";
import { askForDeleteTaskProps } from "../popup/PopupsData.jsx";
import ChangeTaskPopup from "../popup/ChangeTaskPopup.jsx";

import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TaskActionsButtonDescription = ({
  task,
  listShowed,
  setListShowed,
  closeDetails
}) => {
  const { projectId } = useProjectContext();
  const { chosenStage } = useRoadmapContext();
  const { ChangeTask, DeleteTask } = useRoadmapInfo();

  const onCloseChangeTaskPopup = (...params) => {
    if (
      params?.[0]?.button === "change" &&
      chosenStage &&
      task?.id &&
      projectId &&
      params?.[0]?.status &&
      params?.[0]?.name
    ) {
      ChangeTask(
        projectId,
        chosenStage,
        task?.id,
        statusToInt[params?.[0]?.status],
        params?.[0]?.name,
        params?.[0]?.description,
        params?.[0]?.deadline,
        params?.[0]?.attachment
      );
    }
  };
  const onCloseDeleteTaskPopup = (...params) => {
    if (params?.[0] === "yes" && chosenStage && task?.id) {
      DeleteTask(chosenStage, task?.id);
    }
  };

  const setStatus = (status) => {
    if (!(chosenStage && task?.id && task?.name && projectId)) return;
    ChangeTask(
      projectId,
      chosenStage,
      task.id,
      statusToInt[status],
      task.name,
      task?.description,
      task?.deadline_at,
      task?.attachments?.map((attachment) => {
        return attachment.id;
      })
    );
  };

  const popupManager = usePopupManager();
  const openChangeTaskPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: ChangeTaskPopup,
        props: {
          task: {
            name: task?.name,
            description: task?.description,
            status: task?.status,
            deadline: task?.deadline_at,
            attachments: task?.attachments,
          },
          chosenStage: chosenStage,
        },
      },
      onClose: onCloseChangeTaskPopup,
    });
  };
  const openDeleteTaskPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AlertPopup,
        props: askForDeleteTaskProps(task?.name),
      },
      onClose: onCloseDeleteTaskPopup,
    });
  };

  const buttons = [
    task && task?.status === "done"
      ? null
      : {
          icon: DoneTaskIcon,
          text: "Отметить готовой",
          callback: () => setStatus("done"),
        },
    task && task?.status === "in_progress"
      ? null
      : {
          icon: ProgressTaskIcon,
          text: "Отметить выполняемой",
          callback: () => setStatus("in_progress"),
        },
    task && task?.status === "planned"
      ? null
      : {
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
      icon: CloseTaskActionButtonSVG,
      text: "Скрыть подробности",
      callback: () => closeDetails(),
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
      <div className={styles.dotsWrapperItem}>
        <DropdownActionsList
          buttons={buttons}
          showed={listShowed}
          close={() => setListShowed(false)}
          style={{
            display: listShowed ? "block" : "none",
            top: "56px",
            right: "24px",
          }}
        />
      </div>
    </OutsideAlerter>
  );
};

export default TaskActionsButtonDescription;
