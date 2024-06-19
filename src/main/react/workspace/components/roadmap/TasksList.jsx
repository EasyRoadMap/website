import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";
import TaskDescription from "./TaskDescription.jsx";
import Button from "../UI/Button.jsx";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateTaskPopup from "../popup/CreateTaskPopup.jsx";
import { useState, useEffect } from "react";

const statusToInt = {
  in_progress: 0,
  planned: 1,
  done: 2,
};

const TasksList = ({ tasks }) => {
  const [showedAll, setShowedAll] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showTaskDescription, setShowTaskDescription] = useState(false);
  const { CreateTask } = useRoadmapInfo();
  const { chosenStage } = useRoadmapContext();
  const { projectContext } = useProjectContext();


  const popupManager = usePopupManager();

  const getTaskById = (tasks, id) => {
    return tasks?.find((task) => {
      return task.id === id;
    });
  } 

  useEffect(() => {
    const task = getTaskById(tasks, selectedTask?.id);
    if (task == undefined) setSelectedTask(null);
    setSelectedTask(task);
  }, [tasks]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTaskClick = (task) => {
    if (selectedTask === task) return;
    setSelectedTask(task);
    if (screenWidth < 1600) {
      setShowTaskDescription(true);
    }
  };

  const handleCloseTaskDescription = (e) => {
    setSelectedTask(null);
    setShowTaskDescription(false);
  };

  const onCloseCreateTaskPopup = (...params) => {
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

  const shouldShowAllTasks = showedAll || screenWidth >= 1600;

  return (
    <section className={styles.tasksList}>
      {screenWidth < 1600 && (
        <div className={styles.tasksListTitleWrapper}>
          <h1 className={styles.title}>Список задач</h1>
          {screenWidth >= 405 && (
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
          )}
          {screenWidth < 405 && screenWidth >= 350 && (
            <Button
              text="Добавить задачу"
              type="outlineAccent"
              callback={openCreateTaskPopup}
              style={{
                width: "120px",
                height: "30px",
                fontSize: "12px",
                fontWeight: "500",
                padding: "0",
              }}
            />
          )}
          {screenWidth < 350 && (
            <Button
              text="Добавить задачу"
              type="outlineAccent"
              callback={openCreateTaskPopup}
              style={{
                width: "120px",
                height: "30px",
                fontSize: "10px",
                fontWeight: "500",
                padding: "0",
              }}
            />
          )}
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
                    Ваш список задач еще пуст
                  </div>
                  <div className={styles.noTasksSubTitle}>
                    Добавьте первую задачу прямо сейчас!
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
        )}
      </div>
    </section>
  );
};

export default TasksList;
