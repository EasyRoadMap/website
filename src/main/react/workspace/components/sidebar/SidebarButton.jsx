import styles from "./styles.module.css";
const types = {
  main: {
    name: "Главная",
    icon: "",
  },
  projects: {
    name: "Проекты",
    icon: "",
  },
  settings: {
    name: "Настройки",
    icon: "",
  },
};

const SidebarButton = ({
  type, // По type задаются текст кнопки и иконка
  callback,
  chosen, // находится ли пользователь на этой странице
}) => {
  const data = types[type];
  return (
    <div onClick={callback} className={styles.buttonChapter}>
      <img src={data.icon} alt="" />
      <span>{data.name}</span>
    </div>
  );
};

export default SidebarButton;
