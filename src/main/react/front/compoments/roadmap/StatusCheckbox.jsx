import styles from "./styles.module.css";
import { useState } from "react";
import TaskCompletedSVG from "../../../assets/taskCompleted.jsx";
import TaskInProgressSVG from "../../../assets/taskInProgress.jsx";
import TaskInPlannedSVG from "../../../assets/taskInPlanned.jsx";
import CheckSettingsThemeSVG from "../../../assets/checkSettingsThemeSVG.jsx";

const types = {
  completed: {
    name: "Выполнена",
    icon: TaskCompletedSVG,
    className: "completedTask",
  },
  progress: {
    name: "В процессе",
    icon: TaskInProgressSVG,
    className: "inProgressTask",
  },
  planned: {
    name: "Запланировано",
    icon: TaskInPlannedSVG,
    className: "plannedTask",
  },
};

const StatusCheckboxItem = ({ type, isActive, onClick }) => {
  const data = types[type];
  const IconComponent = data.icon;
  const itemClassName = `${styles.statusCheckboxItem} ${
    styles[data.className]
  }`;
  return (
    <div
      className={
        isActive
          ? [itemClassName, styles.statusCheckboxItemActive].join(" ")
          : itemClassName
      }
      onClick={onClick}
    >
      <IconComponent className={styles.statusCheckboxIcon} />
      <span className={styles.statusCheckboxText}>{data.name}</span>x
    </div>
  );
};

const StatusCheckbox = ({ status, setStatus }) => {
  // const [chosen, setChosen] = useState(null);
  return (
    <div className={styles.statusCheckbox}>
      <StatusCheckboxItem
        type="completed"
        isActive={status === "done"}
        onClick={() => setStatus("done")}
      />
      <StatusCheckboxItem
        type="progress"
        isActive={status === "in_progress"}
        onClick={() => setStatus("in_progress")}
      />
      <StatusCheckboxItem
        type="planned"
        isActive={status === "planned"}
        onClick={() => setStatus("planned")}
      />
    </div>
  );
};

export default StatusCheckbox;
