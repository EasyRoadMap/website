import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import TaskActionsButton from "./TaskActionsButton.jsx";

const completionIcons = {
  done: TaskCompletedSVG,
  in_progress: TaskInProgressSVG,
  planned: TaskInPlannedSVG,
};

// TODO: change colors
const completionColors = {
  done: "var(--bg-task-complete)",
  in_progress: "var(--bg-task-in-progress)",
  planned: "var(--bg-task-in-planned)",
};

const TaskItem = ({ task }) => {
  const IconTaskComplete = completionIcons[task?.status];
  console.log("task");
  console.log(task);

  return (
    <div
      className={styles.taskField}
      style={{ backgroundColor: completionColors[task?.status] }}
    >
      <img src="" alt="" />
      <div className={styles.taskFieldsWrapper}>
        <div className={styles.taskMainPart}>
          <div className={styles.taskTitleWrapper}>
            <div className={styles.taskName}>{task?.name}</div>
            <div className={styles.taskDate}>
              <CalendarSVG className={styles.calendarSVG} />
              <span className={styles.taskDateText}>{task?.deadline_at}</span>
            </div>
          </div>
          <div className={styles.taskDescription}>{task?.description}</div>
          <div className={styles.taskParticipantsAvatars}>
            {task?.attachments?.map((participantAvatar, i) => {
              return (
                <img
                  src={participantAvatar}
                  alt=""
                  key={i}
                  className={styles.taskParticipantAvatar}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.taskAsidePart}>
          <IconTaskComplete className={styles.taskCompletionIcon} />
          <TaskActionsButton />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
