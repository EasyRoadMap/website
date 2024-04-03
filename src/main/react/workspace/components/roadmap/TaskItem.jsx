import styles from "./styles.module.css";

const TaskItem = ({
    task
}) => {
    return (
        <div>
            <img src="" alt="" />
            <div className={styles.taskFieldsWrapper}>
                <div className={styles.taskName}>
                    {task.name}
                </div>
                <div className={styles.dots}>

                </div>
            </div>
        </div>
    );
}

export default TaskItem;