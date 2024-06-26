import RoadmapGraph from "./RoadmapGraph.jsx";

import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";
import { useEffect } from "react";

import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";

const Roadmap = ({
    pr_id,
    roadmapRef
}) => {
    const { getStages, getTasks } = useRoadmapInfo();
    const { roadmapContext, chosenStage } = useRoadmapContext();

    useEffect(() => {
        if (chosenStage) {
            getTasks(chosenStage);
        }
    }, [chosenStage]);

    if (roadmapContext?.stages) {
        return (
            <section className={styles.section} ref={roadmapRef} id="roadmap">
                <h1 className={styles.title}>
                    Дорожная карта
                </h1>
                <div className={styles.graphWrapper}>
                    <RoadmapGraph stages={roadmapContext?.stages} projectId={pr_id}/>
                    {/* <RoadmapPagination /> */}
                </div>
                {chosenStage && Object.keys(roadmapContext?.length > 0) && 
                <div className={styles.tasksListWrapper}>
                    <TasksList tasks={roadmapContext?.tasks}/>
                </div>}
            </section>
        );
    }
}

export default Roadmap;