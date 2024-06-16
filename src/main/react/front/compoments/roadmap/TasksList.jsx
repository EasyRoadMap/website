import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";
import TaskDescription from "./TaskDescription.jsx";

import { useState } from "react";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TasksList = ({ tasks }) => {
  const [showedAll, setShowedAll] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const showMoreTasks = () => {
    setShowedAll(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <section className={styles.tasksList}>
      <div className={styles.tasksListWrapper}>
        <div
          className={
            tasks?.length > 0 ? styles.tasksCardList : styles.noTasksWrapper
          }
        >
          <div className={styles.tasksListTitleWrapper}>
            <h1 className={styles.title}>Список задач</h1>
          </div>
          <div
            className={
              tasks?.length > 0
                ? styles.tasksCardList
                : styles.tasksCardListWrapper
            }
          >
            {tasks?.length === 0 && (
              <div className={styles.noTasks}>
                <NoTaskSVG className={styles.noTasksSVG} />
                <div className={styles.noTasksText}>
                  <div className={styles.noTasksTitle}>
                    Список задач пока пуст
                  </div>
                  <div className={styles.noTasksSubTitle}>
                    Администратор еще не добавил задачи для этого этапа
                  </div>
                </div>
              </div>
            )}
            {tasks &&
              tasks.map((task, i) => {
                return (
                  <div
                    className={styles.task}
                    key={i}
                    onClick={() => handleTaskClick(task)}
                  >
                    <TaskItem task={task} isSelected={selectedTask === task} />
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={
            tasks?.length > 0
              ? styles.tasksDescription
              : styles.noTasksDescriotion
          }
        >
          {selectedTask ? (
            <TaskDescription task={selectedTask} />
          ) : (
            <div className={styles.noTaskSelected}>
              <NoTaskSVG className={styles.noTasksSVG} />
              <div className={styles.noTasksText}>
                <div className={styles.noTasksTitle}>Задача не выбрана</div>
                <div className={styles.noTasksSubTitle}>
                  Выберите задачу из списка слева для <br /> просмотра
                  информации о ней
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TasksList;
