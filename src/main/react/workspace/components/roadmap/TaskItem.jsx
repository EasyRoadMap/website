import styles from "./styles.module.css";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import TaskActionsButton from "./TaskActionsButton.jsx";
import ButtonDotsVerticalSVG from "../../../assets/buttonDotsVertical.jsx";
import PaperClipSVG from "../../../assets/paperClipSVG.jsx";
import { transformDate } from "../../../common/utils/separatedByDashesDateToSeparatedByDots.js";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import ChangeTaskPopup from "../popup/ChangeTaskPopup.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";
import { useState } from "react";

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

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TaskItem = ({ task, isSelected }) => {
  const IconTaskComplete = completionIcons[task?.status];
  const classTask = isSelected
    ? styles[completionColorsActive[task?.status]]
    : styles[completionColors[task?.status]];

  const [listShowed, setListShowed] = useState(false);

  const toggleListvisibility = (event) => {
    event.stopPropagation();
    setListShowed((prev) => !prev);
  };

  return (
    <>
      <div className={styles.taskWrapper}>
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
                  {task?.attachments?.length > 0 && (
                    <div className={styles.taskAttachmentsLength}>
                      <PaperClipSVG className={styles.paperClipSVG} />
                      <span className={styles.taskAttachmentsLengthText}>
                        {task?.attachments?.length}
                      </span>
                    </div>
                  )}
                </div>
                <span
                  className={styles.taskDescription}
                  style={task?.description ? null : { display: "none" }}
                >
                  {task?.description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.taskAsidePart}>
          <div
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconTaskComplete
              className={styles.taskCompletionIcon}
              style={{ width: "21px", height: "21px" }}
            />
          </div>

          <button className={styles.dotsWrapper} onClick={toggleListvisibility}>
            <ButtonDotsVerticalSVG className={styles.dots} />
          </button>
          <TaskActionsButton
            task={task}
            listShowed={listShowed}
            setListShowed={setListShowed}
          />
        </div>
      </div>
    </>
  );
};

export default TaskItem;
