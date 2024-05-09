import RoadmapGraph from "./RoadmapGraph.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";
import { useTasksAPI } from "../../hooks/useTasksAPI.js";
import useTasksContext from "../../hooks/useTasksContext.js";
import { useEffect, useState } from "react";

const Roadmap = ({
    pr_id,
    stages,
}) => {
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
                <h1 className={styles.title}>
                    Дорожная карта
                </h1>
                <div className={styles.graphWrapper}>
                    <RoadmapGraph 
                        stages={stages}
                        chosenStage={chosenStage}
                        setChosenStage={setChosenStage}
                    />
                </div>
                {(chosenStage && tasksContext && tasksContext?.length > 0) && 
                <div className={styles.tasksListWrapper}>
                    <TasksList 
                        tasks={tasksContext}
                    />
                </div>}
            </section>
        );
    }
}

export default Roadmap;