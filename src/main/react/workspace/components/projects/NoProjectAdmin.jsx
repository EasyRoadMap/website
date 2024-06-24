import styles from "./styles.module.css";
import NoProjectSVG from "../../../assets/noProjectSVG.jsx";
import { useState, useEffect } from "react";

const types = {
  workspace: {
    name: "Нет доступных проектов",
    description:
      "Администратор еще не добавил проекты в эту рабочую область, или у Вас нет доступа к ним",
    className: null,
  },
  public: {
    name: "Здесь пока нет проектов",
    description: "Администратор ещё не добавил проекты в эту рабочую область",
    className: "noProjectWrapper",
  },
};

const NoProjectAdmin = ({ type }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(types[type]);
  });
  const className = styles[data.className];
  return (
    <div className={className}>
      <div className={styles.noProjectInfo}>
        <div className={styles.noProjectText}>
          <NoProjectSVG className={styles.noProjectSVG} />
          <div className={styles.noProjectTextWrapper}>
            <div className={styles.noProjectTextTitle}>{data.name}</div>
            <div className={styles.noProjectTextDescription}>
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProjectAdmin;
