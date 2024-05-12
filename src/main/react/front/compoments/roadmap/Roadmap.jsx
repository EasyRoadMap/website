import RoadmapGraph from "./RoadmapGraph.jsx";
import NoTaskSVG from "../../../assets/noTaskSVG.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";
import { useTasksAPI } from "../../hooks/useTasksAPI.js";
import useTasksContext from "../../hooks/useTasksContext.js";
import { useEffect, useState } from "react";

const Roadmap = ({ pr_id, stages }) => {
  const { GetTasks } = useTasksAPI();
  const [chosenStage, setChosenStage] = useState(null);
  const { tasksContext } = useTasksContext();

  useEffect(() => {
    if (chosenStage) {
      GetTasks(chosenStage);
    }
  }, [chosenStage]);

  if (stages) {
    return (
      <section className={styles.section} id="roadmap">
        <h1 className={styles.title}>Дорожная карта</h1>
        <div className={styles.graphWrapper}>
          <RoadmapGraph
            stages={stages}
            chosenStage={chosenStage}
            setChosenStage={setChosenStage}
          />
        </div>
        {chosenStage && tasksContext && tasksContext?.length >= 0 && (
          <div className={styles.tasksListWrapper}>
            <TasksList tasks={tasksContext} />
          </div>
        )}
      </section>
    );
  }
  return (
    <section className={styles.section} id="roadmap">
      <h1 className={styles.title}>Дорожная карта</h1>
      <div className={styles.noTasks}>
        <NoTaskSVG className={styles.noTasksSVG} />
        <div className={styles.noTasksText}>
          <div className={styles.noTasksTitle}>На карте пока нет этапов</div>
          <div className={styles.noTasksSubTitle}>
            Администратор ещё не добавил этапы для этой дорожной карты
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;