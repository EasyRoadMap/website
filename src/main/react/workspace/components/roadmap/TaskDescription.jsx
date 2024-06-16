import styles from "./TaskDescription.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import ZipFielIconSVG from "../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../assets/unhandledFieldIconSVG.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import { beautifyDate } from "../../../front/utils/transformDateToMoreReadable.js";
import Button from "../UI/Button.jsx";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import ChangeTaskPopup from "../popup/ChangeTaskPopup.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const completionIcons = {
  done: TaskCompletedSVG,
  in_progress: TaskInProgressSVG,
  planned: TaskInPlannedSVG,
};
const completionColors = {
  done: "taskFieldDone",
  in_progress: "taskFieldProgress",
  planned: "taskFieldPlanned",
};
const titleTaskStatus = {
  done: "Выполнено",
  in_progress: "В процессе",
  planned: "В плане",
};

function formatBytes(a, b = 2) {
  if (!+a) return "0 B";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}

const TaskDescription = ({ task }) => {
  const { projectId } = useProjectContext();
  const { ChangeTask } = useRoadmapInfo();
  const { chosenStage } = useRoadmapContext();

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

  // const checkCollision = (event) => {
  //   const dotsBlock = document.querySelector("." + styles.dots);
  //   const dotsBlockBoundingClientRect = dotsBlock.getBoundingClientRect();
  //   console.debug(
  //     dotsBlockBoundingClientRect.x,
  //     dotsBlockBoundingClientRect.width,
  //     dotsBlockBoundingClientRect.y,
  //     dotsBlockBoundingClientRect.height
  //   );

  //   return (
  //     dotsBlockBoundingClientRect.x <= event.clientX &&
  //     event.clientX <=
  //       dotsBlockBoundingClientRect.x + dotsBlockBoundingClientRect.width &&
  //     dotsBlockBoundingClientRect.y <= event.clientY &&
  //     event.clientY <=
  //       dotsBlockBoundingClientRect.x + dotsBlockBoundingClientRect.height
  //   );
  // };
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

  const IconTaskComplete = completionIcons[task?.status];
  const classTask = styles[completionColors[task?.status]];
  return (
    <div className={styles.taskDescriptionWrapper}>
      <div className={styles.taskDateWraper}>
        <div className={styles.taskDate}>
          <div className={classTask}>
            <IconTaskComplete />
            <span className={styles.taskStatus}>
              {titleTaskStatus[task?.status]}
            </span>
          </div>
          {task.deadline_at && (
            <div className={styles.DateWraper}>
              <CalendarSVG className={styles.calendarSVG} />
              <span className={styles.taskDateText}>
                {task?.deadline_at ? beautifyDate(task?.deadline_at) : null}
              </span>
            </div>
          )}
        </div>
        <div>
          <Button
            text="Редактировать"
            type="outlineSecondary"
            callback={openChangeTaskPopup}
            style={{
              width: "156px",
              height: "36px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          />
        </div>
      </div>
      <div className={styles.taskDescriptionInfo}>
        <span className={styles.taskName}>{task?.name}</span>
      </div>
      <div className={styles.taskDescriptionInfoPhoto}>
        <span className={styles.taskDescription}>{task?.description}</span>
        {task?.attachments?.length > 0 && <hr className={styles.hr}></hr>}
        <div className={styles.taskParticipantAttachments}>
          {task?.attachments?.map((attachmentPhoto, i) => (
            <div key={i} className={styles.attachmentContainer}>
              {attachmentPhoto.type === "image" ? (
                <img
                  src={attachmentPhoto.url}
                  alt=""
                  className={styles.taskParticipantAvatar}
                />
              ) : (
                <div className={styles.unhandledFile}>
                  {attachmentPhoto.type === "archive" && (
                    <ZipFielIconSVG className={styles.fileIcon} />
                  )}
                  {attachmentPhoto.type === "default" && (
                    <UnhandledFieldIcon className={styles.fileIcon} />
                  )}
                </div>
              )}
              <div className={styles.attachmentImgInfo}>
                <span className={styles.attachmentImgInfoName}>
                  {attachmentPhoto.file_name}
                </span>
                <span className={styles.attachmentImgInfoSize}>
                  {formatBytes(attachmentPhoto.size)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
