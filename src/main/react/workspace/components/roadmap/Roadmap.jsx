import RoadmapGraph from "./RoadmapGraph.jsx";
import TasksList from "./TasksList.jsx";
import styles from "./styles.module.css";

const Roadmap = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
                Дорожная карта
            </h1>
            <div className={styles.graphWrapper}>
                <RoadmapGraph />
            </div>
            <div className={styles.tasksListWrapper}>
                <TasksList tasks={[
                    {name: "Название задачи", id: 1}, // further here will be callbacks for options
                    {name: "Название задачи", id: 2},
                    {name: "Название задачи", id: 3},
                ]}/>
            </div>
            <div className={styles.showMoreButton}>
                Показать ещё
            </div>
        </section>
    );
}

export default Roadmap;