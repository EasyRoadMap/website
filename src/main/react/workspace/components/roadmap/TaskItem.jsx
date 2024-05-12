import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import TaskActionsButton from "./TaskActionsButton.jsx";
import ZipFielIconSVG from "../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../assets/unhandledFieldIconSVG.jsx";
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
  console.log("task");
  console.log(task);
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
                    {task?.deadline_at}
                  </span>
                </div>
              )}
            </div>
            <span className={styles.taskDescription}>{task?.description}</span>
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
        <div className={styles.taskAsidePart}>
          <IconTaskComplete className={styles.taskCompletionIcon} />
          <TaskActionsButton task={task} />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
