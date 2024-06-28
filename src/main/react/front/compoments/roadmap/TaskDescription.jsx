import styles from "./TaskDescription.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import ZipFielIconSVG from "../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../assets/unhandledFieldIconSVG.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import { beautifyDate } from "../../utils/transformDateToMoreReadable.js";
import CloseTaskDescriptionSVG from "../../../assets/closeTaskDescription.jsx";
import { useState, useEffect } from "react";

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

const bgColorTaskDescription = {
  done: "taskDescriptionDone",
  in_progress: "taskDescriptionProgress",
  planned: "taskDescriptionPlanned",
};

function formatBytes(a, b = 2) {
  if (!+a) return "0 B";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}

const TaskDescription = ({ task, onClose }) => {
  const IconTaskComplete = completionIcons[task?.status];
  const classTask = styles[completionColors[task?.status]];
  const bcgTaskDescription = styles[bgColorTaskDescription[task?.status]];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={
        screenWidth >= 1600 ? styles.taskDescriptionWrapper : bcgTaskDescription
      }
    >
      <div className={styles.taskDateWraper}>
        <div className={styles.taskDate}>
          <div className={classTask}>
            <IconTaskComplete />
            {screenWidth >= 1600 && (
              <span className={styles.taskStatus}>
                {titleTaskStatus[task?.status]}
              </span>
            )}
            {screenWidth < 1600 && (
              <div className={styles.taskNameWrapper}>
                <span className={styles.taskName}>{task?.name}</span>
              </div>
            )}
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
        <div className={styles.closeTaskDescription} onClick={onClose}>
          <CloseTaskDescriptionSVG />
        </div>
      </div>
      {screenWidth >= 1600 && (
        <div className={styles.taskNameWrapper}>
          <span className={styles.taskName}>{task?.name}</span>
        </div>
      )}
      <div className={styles.taskDescriptionInfoPhoto}>
        <span
          className={styles.taskDescription}
          style={{ display: task.description ? null : "none" }}
        >
          {task?.description}
        </span>
        {task?.attachments?.length > 0 && (
          <hr
            className={styles.hr}
            style={{ display: task.attachments?.length > 0 ? null : "none" }}
          ></hr>
        )}
        <div
          className={
            task?.attachments?.length > 1
              ? styles.taskParticipantAttachments
              : styles.taskParticipantAttachmentsOne
          }
        >
          {task?.attachments?.map((attachmentPhoto, i) => (
            <div key={i} className={styles.attachmentContainer}>
              {attachmentPhoto.type === "image" ? (
                <img
                  src={attachmentPhoto.url}
                  alt=""
                  className={
                    task?.attachments?.length > 1
                      ? styles.taskParticipantAvatar
                      : styles.taskParticipantAvatarOne
                  }
                />
              ) : (
                <div
                  className={
                    task?.attachments?.length > 1
                      ? styles.unhandledFile
                      : styles.unhandledFileOne
                  }
                >
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
