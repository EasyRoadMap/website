import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import Button from "../UI/Button.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateTaskPopup from "../popup/CreateTaskPopup.jsx";

import { useState } from "react";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TasksList = ({ tasks }) => {
  const { CreateTask } = useRoadmapInfo();
  const { chosenStage } = useRoadmapContext();
  const { projectContext } = useProjectContext();

  const [showedAll, setShowedAll] = useState(false);

  const popupManager = usePopupManager();

  const onCloseCreateTaskPopup = (...params) => {
    console.log(params?.[0]);
    if (
      params?.[0]?.button === "create" &&
      chosenStage &&
      params?.[0]?.status &&
      params?.[0]?.name &&
      projectContext?.id
    ) {
      CreateTask(
        projectContext?.id,
        chosenStage,
        statusToInt[params?.[0]?.status],
        params?.[0]?.name,
        params?.[0]?.description,
        params?.[0]?.deadline,
        params?.[0]?.attachment
      );
    }
  };

  const openCreateTaskPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: CreateTaskPopup,
        props: {
          chosenStage: chosenStage,
        },
      },
      onClose: onCloseCreateTaskPopup,
    });
  };

  const showMoreTasks = () => {
    setShowedAll(true);
  };

  return (
    <section className={styles.tasksList}>
      <div className={styles.tasksListTitleWrapper}>
        <h1 className={styles.title}>Список задач</h1>
        <Button
          text="Добавить задачу"
          type="outlineAccent"
          callback={openCreateTaskPopup}
          style={{
            width: "142px",
            height: "30px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "0",
          }}
        />
      </div>
      {tasks?.length === 0 && (
        <div className={styles.noTasks}>
          <NoTaskSVG className={styles.noTasksSVG} />
          <div className={styles.noTasksText}>
            <div className={styles.noTasksTitle}>Ваш список задач ещё пуст</div>
            <div className={styles.noTasksSubTitle}>
              Добавьте первую задачу прямо сейчас!
            </div>
          </div>
        </div>
      )}
      {tasks &&
        tasks.map((task, i) => {
          if (i < 3 || showedAll)
            return (
              <div className={styles.task}>
                <TaskItem task={task} key={i} />
              </div>
            );
        })}
      {tasks?.length > 3 && !showedAll && (
        <div className={styles.showMoreButton} onClick={showMoreTasks}>
          Показать ещё
        </div>
      )}
    </section>
  );
};

export default TasksList;
