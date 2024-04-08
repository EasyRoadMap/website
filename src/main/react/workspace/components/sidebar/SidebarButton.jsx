import styles from "./styles.module.css";
import HomeSVG from "../../../assets/homeIconSVG.jsx";
import SettingsSVG from "../../../assets/settingsSidebarIconSVG.jsx";
import ProjectsSVG from "../../../assets/projectIconSVG.jsx";

const types = {
  main: {
    name: "Главная",
    icon: HomeSVG,
  },
  projects: {
    name: "Проекты",
    icon: ProjectsSVG,
  },
  settings: {
    name: "Настройки",
    icon: SettingsSVG,
  },
};

const SidebarButton = ({
  type, // По type задаются текст кнопки и иконка
  callback,
  chosen, // находится ли пользователь на этой странице
}) => {
  const data = types[type];
  const IconComponent = data.icon;
  return (
    <button onClick={callback} className={styles.buttonChapter}>
      <IconComponent className={styles.buttonChapterIcon} />
      <span className={styles.buttonChapterName}>{data.name}</span>
    </button>
  );
};

export default SidebarButton;
