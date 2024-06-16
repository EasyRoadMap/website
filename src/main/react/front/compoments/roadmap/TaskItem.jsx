import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import PaperClipSVG from "../../../assets/paperClipSVG.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
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

const completionColorsActive = {
  done: "taskFieldDoneActive",
  in_progress: "taskFieldProgressActive",
  planned: "taskFieldPlannedActive",
};

const TaskItem = ({ task, isSelected }) => {
  const IconTaskComplete = completionIcons[task?.status];
  const classTask = isSelected
    ? styles[completionColorsActive[task?.status]]
    : styles[completionColors[task?.status]];

  return (
    <div className={classTask}>
      <div className={styles.taskFieldsWrapper}>
        <div className={styles.taskMainPart}>
          <div className={styles.taskInfo}>
            <div className={styles.taskTitleWrapper}>
              <span className={styles.taskName}>{task?.name}</span>
              <div className={styles.taskDateWrapper}>
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
                {task?.attachments?.length > 0 && (
                  <div className={styles.taskAttachmentsLength}>
                    <PaperClipSVG className={styles.paperClipSVG} />
                    <span className={styles.taskAttachmentsLengthText}>
                      {task?.attachments?.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.taskDescription}
              style={task?.description ? null : { display: "none" }}
            >
              {task?.description}
            </div>
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
