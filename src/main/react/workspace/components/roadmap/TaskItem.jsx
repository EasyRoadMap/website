import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import TaskActionsButton from "./TaskActionsButton.jsx";
import ZipFielIconSVG from "../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../assets/unhandledFieldIconSVG.jsx";
import { transformDate } from "../../../common/utils/separatedByDashesDateToSeparatedByDots.js";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import ChangeTaskPopup from "../popup/ChangeTaskPopup.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import { useState } from "react";

const completionIcons = {
  done: TaskCompletedSVG,
  in_progress: TaskInProgressSVG,
  planned: TaskInPlannedSVG,
};

// TODO: change colors
const completionColors = {
  done: "taskFieldDone",
  in_progress: "taskFieldProgress",
  planned: "taskFieldPlanned",
};

const TaskItem = ({ task }) => {
  const IconTaskComplete = completionIcons[task?.status];
  const classTask = styles[completionColors[task?.status]];

  const { ChangeTask } = useRoadmapInfo();
  const { chosenStage } = useRoadmapContext();
  const [listShowed, setListShowed] = useState(false);

  const popupManager = usePopupManager();
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

  const checkCollision = (event) => {
    const dotsBlock = document.querySelector("." + styles.dots);
    const dotsBlockBoundingClientRect = dotsBlock.getBoundingClientRect();
    console.debug(
      dotsBlockBoundingClientRect.x,
      dotsBlockBoundingClientRect.width,
      dotsBlockBoundingClientRect.y,
      dotsBlockBoundingClientRect.height
    );

    return (
      dotsBlockBoundingClientRect.x <= event.clientX &&
      event.clientX <=
        dotsBlockBoundingClientRect.x + dotsBlockBoundingClientRect.width &&
      dotsBlockBoundingClientRect.y <= event.clientY &&
      event.clientY <=
        dotsBlockBoundingClientRect.x + dotsBlockBoundingClientRect.height
    );
  };

  const openChangeTaskPopup = (event) => {
    if (checkCollision(event)) return;
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
  const toggleListvisibility = () => {
    setListShowed((prev) => !prev);
  };

  return (
    <>
      <div className={styles.taskWrapper}>
        <div className={classTask} onClick={openChangeTaskPopup}>
          <div className={styles.taskFieldsWrapper}>
            <div className={styles.taskMainPart}>
              <div className={styles.taskInfo}>
                <div className={styles.taskTitleWrapper}>
                  <div className={styles.taskName}>{task?.name}</div>
                  {task.deadline_at && (
                    <div className={styles.taskDate}>
                      <CalendarSVG className={styles.calendarSVG} />
                      <span className={styles.taskDateText}>
                        {task?.deadline_at
                          ? transformDate(task?.deadline_at)
                          : null}
                      </span>
                    </div>
                  )}
                </div>
                <span className={styles.taskDescription}>
                  {task?.description}
                </span>
              </div>
              <div className={styles.taskParticipantsAvatars}>
                {task?.attachments?.map((participantAvatar, i) => {
                  return (
                    <>
                      {participantAvatar.type === "image" ? (
                        <img
                          src={participantAvatar.url}
                          alt=""
                          key={i}
                          className={styles.taskParticipantAvatar}
                        />
                      ) : (
                        <div className={styles.unhandledFile}>
                          {participantAvatar.type === "archive" && (
                            <ZipFielIconSVG className={styles.fileIcon} />
                          )}
                          {participantAvatar.type === "default" && (
                            <UnhandledFieldIcon className={styles.fileIcon} />
                          )}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.taskAsidePart}>
          <IconTaskComplete
            className={styles.taskCompletionIcon}
            style={{ width: "32px", height: "32px" }}
          />
          <div className={styles.dotsWrapper} onClick={toggleListvisibility}>
            <TaskActionsButton
              task={task}
              listShowed={listShowed}
              setListShowed={setListShowed}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
