import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";

import { useState } from "react";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TasksList = ({ tasks }) => {
  const [showedAll, setShowedAll] = useState(false);

  const showMoreTasks = () => {
    setShowedAll(true);
  };

  return (
    <section className={styles.tasksList}>
      <div className={styles.tasksListTitleWrapper}>
        <h1 className={styles.title}>Список задач</h1>
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
