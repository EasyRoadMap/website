import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";

const TasksList = ({
    tasks
}) => {
    return (
        <section className={styles.tasksList}>
            <h1 className={styles.title}>
                Список задач
            </h1>
            {tasks.map((task, i) => {
                <div className={styles.task}>
                    <TaskItem task={task} key={i}/>
                </div>
            })}
        </section>
    );
}

export default TasksList;