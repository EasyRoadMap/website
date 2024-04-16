import styles from "./styles.module.css";
import { useState } from "react";

const StatusCheckboxItem = ({
    icon,
    text,
    status
}) => {
    return (
        <div className={[styles.statusCheckboxItem, styles[status]].join(" ")} 
        >
            <img src={icon} alt="" />
            <span className={styles.statusCheckboxText}>
                {text}
            </span>
            {/* if chosen add icon */}
        </div>
    );
}

const StatusCheckbox = () => {
    return (
        <StatusCheckboxItem 
            icon=""
            text="Выполнено"
            color="white"
        />
    );
}

export default StatusCheckbox;