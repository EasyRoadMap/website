import styles from "./styles.module.css";
import { useState } from "react";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";

const types = {
  Completed: {
    name: "Выполнена",
    icon: TaskCompletedSVG,
    className: "completedTask",
  },
  Progress: {
    name: "В процессе",
    icon: TaskInProgressSVG,
    className: "inProgressTask",
  },
  Planned: {
    name: "Запланировано",
    icon: TaskInPlannedSVG,
    className: "plannedTask",
  },
};

const StatusCheckboxItem = ({ type }) => {
  const data = types[type];
  const IconComponent = data.icon;
  const itemClassName = `${styles.statusCheckboxItem} ${
    styles[data.className]
  }`;
  return (
    <div className={itemClassName}>
      <IconComponent className={styles.statusCheckboxIcon} />
      <span className={styles.statusCheckboxText}>{data.name}</span>
      {/* if chosen add icon */}
    </div>
  );
};

const StatusCheckbox = () => {
  return (
    <div className={styles.statusCheckbox}>
      <StatusCheckboxItem type="Completed" />
      <StatusCheckboxItem type="Progress" />
      <StatusCheckboxItem type="Planned" />
    </div>
  );
};

export default StatusCheckbox;
