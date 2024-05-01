import RoadmapGraph from "./RoadmapGraph.jsx";
import RoadmapPagination from "./RoadmapPagination.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";
import { useEffect } from "react";

import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js"

const Roadmap = ({
    pr_id
}) => {
    const { getStages, getTasks } = useRoadmapInfo();
    const { roadmapContext, chosenStage } = useRoadmapContext();

    // useEffect(() => {
    //     console.log("DAMN");
    //     console.log(projectId);
    //     if (projectId) {
    //         getStages(projectId);
    //     }
    // }, [projectId]);
    useEffect(() => {
        console.debug(pr_id);
        console.debug("hehe");
    }, [])

    useEffect(() => {
        if (chosenStage) {
            getTasks(chosenStage);
        }
    }, [chosenStage]);

    if (roadmapContext?.stages) {
        return (
            <section className={styles.section} id="roadmap">
                <h1 className={styles.title}>
                    Дорожная карта
                </h1>
                <div className={styles.graphWrapper}>
                    <RoadmapGraph stages={roadmapContext?.stages}/>
                    {/* <RoadmapPagination /> */}
                </div>
                {chosenStage && 
                <div className={styles.tasksListWrapper}>
                    <TasksList tasks={roadmapContext?.tasks}/>
                </div>}
            </section>
        );
    }
}

export default Roadmap;