import RoadmapGraph from "./RoadmapGraph.jsx";
import RoadmapPagination from "./RoadmapPagination.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";
import { useEffect } from "react";

import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import useRoadmapContext from "../../hooks/useRoadmapContext.js";
import useProjectContext from "../../hooks/useProjectContext.js"

const tasks = [
    {
        name: "Создание дизайна", 
        date: "17.05.24", 
        description: "Сделаны макеты основных страниц личного кабинета",
        participantsAvatars: ["", ""],
        completion: "progress",
    },
    {
        name: "Создание дизайна", 
        date: "17.05.24", 
        description: "Сделаны макеты основных страниц личного кабинета",
        participantsAvatars: ["", ""],
        completion: "planned",
    },
    {
        name: "Создание дизайна", 
        date: "17.05.24", 
        description: "Сделаны макеты основных страниц личного кабинета",
        participantsAvatars: ["", ""],
        completion: "done",
    },
]

const stages = [
    { status: "done", name: "Этап 1", chosen: false },
    { status: "done", name: "Этап 2", chosen: false },
    { status: "done", name: "Этап 3", chosen: false },
    { status: "done", name: "Этап 4", chosen: false },
    { status: "progress", name: "Этап 5", chosen: false },
    { status: "progress", name: "Этап 6", chosen: false },
    { status: "planned", name: "Этап 7", chosen: false }
]

const Roadmap = () => {
    const { getStages, getTasks } = useRoadmapInfo();
    const { projectId } = useProjectContext();
    const { roadmapContext, chosenStage } = useRoadmapContext();

    useEffect(() => {
        console.log("DAMN");
        console.log(projectId);
        if (projectId) {
        getStages(projectId);
        }
    }, [projectId]);

    useEffect(() => {
        getTasks(chosenStage);
    }, [chosenStage]);

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

export default Roadmap;