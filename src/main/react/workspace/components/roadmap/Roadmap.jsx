import RoadmapGraph from "./RoadmapGraph.jsx";
import RoadmapPagination from "./RoadmapPagination.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";

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
    return (
        <section className={styles.section} id="roadmap">
            <h1 className={styles.title}>
                Дорожная карта
            </h1>
            <div className={styles.graphWrapper}>
                <RoadmapGraph stages={stages}/>
                {/* <RoadmapPagination /> */}
            </div>
            <div className={styles.tasksListWrapper}>
                <TasksList tasks={tasks}/>
            </div>
        </section>
    );
}

export default Roadmap;