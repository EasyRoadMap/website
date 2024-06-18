import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";
import TaskDescription from "./TaskDescription.jsx";

const TasksList = ({ tasks }) => {
  const [showedAll, setShowedAll] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showTaskDescription, setShowTaskDescription] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showMoreTasks = () => {
    setShowedAll(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    if (screenWidth < 1600) {
      setShowTaskDescription(true);
    }
  };

  const handleCloseTaskDescription = () => {
    setShowTaskDescription(false);
    setSelectedTask(null);
    console.log("closed");
    console.log(showTaskDescription);
  };

  const shouldShowAllTasks = showedAll || screenWidth >= 1600;

  return (
    <section className={styles.tasksList}>
      {screenWidth < 1600 && (
        <div className={styles.tasksListTitleWrapper}>
          <h1 className={styles.title}>Список задач</h1>
        </div>
      )}
      <div className={styles.tasksListWrapper}>
        <div
          className={
            tasks?.length > 0
              ? styles.tasksCardListBlock
              : styles.noTasksWrapper
          }
        >
          {screenWidth >= 1600 && (
            <div className={styles.tasksListTitleWrapper}>
              <h1 className={styles.title}>Список задач</h1>
            </div>
          )}

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
                if (i < 3 || shouldShowAllTasks)
                  return (
                    <div
                      className={styles.task}
                      onClick={() => handleTaskClick(task)}
                      key={i}
                    >
                      {selectedTask === task &&
                      showTaskDescription &&
                      screenWidth < 1600 ? (
                        <div className={styles.taskDescriptionWrapper}>
                          <TaskDescription
                            task={task}
                            onClose={handleCloseTaskDescription}
                          />
                        </div>
                      ) : (
                        <TaskItem
                          task={task}
                          isSelected={selectedTask === task}
                        />
                      )}
                    </div>
                  );
              })}
            {tasks?.length > 3 && !showedAll && screenWidth < 1600 && (
              <div className={styles.showMoreButton} onClick={showMoreTasks}>
                Показать ещё
              </div>
            )}
          </div>
        </div>
        {screenWidth >= 1600 && (
          <div
            className={
              tasks?.length > 0
                ? styles.tasksDescription
                : styles.noTasksDescription
            }
          >
            {selectedTask ? (
              <TaskDescription
                task={selectedTask}
                onClose={handleCloseTaskDescription}
              />
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
        )}
      </div>
    </section>
  );
};

export default TasksList;
