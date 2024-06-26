import styles from "./styles.module.css";
import HomeSVG from "../../../assets/homeIconSVG.jsx";
import SettingsSVG from "../../../assets/settingsSidebarIconSVG.jsx";
import ProjectsSVG from "../../../assets/projectIconSVG.jsx";
import ExitIconSidebarSVG from "../../../assets/exitIconSidebarSVG.jsx";

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
  // settings: {
  //   name: "Настройки",
  //   icon: SettingsSVG,
  //   className: "buttonChapterIcon",
  // },
  exit: {
    name: "Выход",
    icon: ExitIconSidebarSVG,
    className: "buttonChapterIconExit",
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
    <button onClick={callback} className={buttonClass}>
      <IconComponent className={className} />
      <span className={styles.buttonChapterName}>{data.name}</span>
    </button>
  );
};

export default SidebarButton;
