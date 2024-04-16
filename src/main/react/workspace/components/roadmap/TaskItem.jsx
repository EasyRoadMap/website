import styles from "./styles.module.css";

const completionIcons = {
    "done": "",
    "progress": "",
    "planned": ""
}

// TODO: change colors
const completionColors = {
    "done": "var(--bg-color-and-popup)",
    "progress": "var(--bg-color-and-popup)",
    "planned": "var(--bg-color-and-popup)"
}

const TaskItem = ({
    task
}) => {
    console.log("task");
    console.log(task);

    return (
        <div className={styles.taskField} style={{backgroundColor: completionColors[task?.completion]}}>
            <img src="" alt="" />
            <div className={styles.taskFieldsWrapper}>
                <div className={styles.taskTitleWrapper}>
                    <div className={styles.taskName}>
                        {task?.name}
                    </div>
                    <div className={styles.taskDate}>
                        <img src="" alt="" />
                        <span>{task?.date}</span>
                    </div>
                </div>
                <div className={styles.taskDescription}>
                    {task?.description}
                </div>
                <div className={styles.taskParticipantsAvatars}>
                    {task?.participantsAvatars?.map((participantAvatar, i) => {
                        return (
                            <img src={participantAvatar} alt="" key={i} className={styles.taskParticipantAvatar}/>
                        );
                    })}
                </div>
                <div className={styles.taskAsidePart}>
                    <img src={completionIcons[task?.completion]} alt="" className={styles.taskCompletionIcon}/>
                    <img src="" alt="..." className={styles.dots}/>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;