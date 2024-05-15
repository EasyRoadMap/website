import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import ZipFielIconSVG from "../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../assets/unhandledFieldIconSVG.jsx";
import { transformDate } from "../../../common/utils/separatedByDashesDateToSeparatedByDots.js";

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

const TaskItem = ({ task }) => {
  const IconTaskComplete = completionIcons[task?.status];
  const classTask = styles[completionColors[task?.status]];

  return (
    <div className={classTask}>
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
            <span
              className={styles.taskDescription}
              style={
                task?.description ? { display: "flex" } : { display: "none" }
              }
            >
              {task?.description}
            </span>
          </div>
          <div
            className={styles.taskParticipantsAvatars}
            style={
              task?.attachments ? { display: "flex" } : { display: "none" }
            }
          >
            {task?.attachments?.map((attachmentPhoto, i) => {
              return (
                <>
                  {attachmentPhoto.type === "image" ? (
                    <img
                      src={attachmentPhoto.url}
                      alt=""
                      key={i}
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
                </>
              );
            })}
          </div>
        </div>
        <div className={styles.taskAsidePart}>
          <IconTaskComplete
            className={styles.taskCompletionIcon}
            style={{ width: "21px", height: "21px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
