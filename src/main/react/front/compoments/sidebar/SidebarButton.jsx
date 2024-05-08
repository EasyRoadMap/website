import styles from "./style.module.css";
import HomeSVG from "../../../assets/homeIconSVG.jsx";
import ProjectsSVG from "../../../assets/projectIconSVG.jsx";

const types = {
  main: {
    name: "Главная",
    icon: HomeSVG,
    className: "buttonChapterIcon",
  },
  projects: {
    name: "Проекты",
    icon: ProjectsSVG,
    className: "buttonChapterIcon",
  },
};

const SidebarButton = ({ type, callback, active }) => {
  const data = types[type];
  const IconComponent = data.icon;

  const buttonClass = active
    ? [styles.buttonChapter, styles.buttonChapterActive].join(" ")
    : styles.buttonChapter;

  const className = styles[data.className];

  return (
    <button onClick={callback} className={styles.buttonChapter}>
      <IconComponent className={className} />
      <span className={styles.buttonChapterName}>{data.name}</span>
    </button>
  );
};

export default SidebarButton;
