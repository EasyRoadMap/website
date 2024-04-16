import styles from "./styles.module.css";
import TaskItem from "./TaskItem.jsx";
import Button from "../UI/Button.jsx";

const TasksList = ({
    tasks
}) => {
    console.log("tasksList");
    console.log(tasks);
    return (
        <section className={styles.tasksList}>
            <div className={styles.tasksListTitleWrapper}>
                <h1 className={styles.title}>
                    Список задач
                </h1>
                <Button text="Добавить задачу" type="outlineAccent" callback={() => {}}/>
            </div>
            {tasks.map((task, i) => {
                return (
                    <div className={styles.task}>
                        <TaskItem task={task} key={i}/>
                    </div>
                );
            })}
            <div className={styles.showMoreButton}>
                Показать ещё
            </div>
        </section>
    );
}

export default TasksList;