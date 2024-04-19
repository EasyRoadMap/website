import styles from "./styleUI.module.css";
import Switch from "./switch.jsx";
import DarkThemeLayoutSVG from "../../../assets/darkThemelayoutSVG.jsx";
import LightThemeLayoutSVG from "../../../assets/lightThemeLayoutSVG.jsx";

export default function ThemeChange() {
  return (
    <div className={styles.themeWrapper}>
      <span className={styles.title}>Тема</span>
      <span className={styles.description}>
        Выберите тему сайта либо оставьте по умолчанию.
      </span>
      <div className={styles.themeChangeBlock}>
        <div className={styles.lightButton}>
          <LightThemeLayoutSVG />
        </div>
        <div className={styles.darkButton}>
          <DarkThemeLayoutSVG />
        </div>
      </div>
      <div className={styles.switchBlock}>
        <Switch />
        <span className={styles.systemThemeTitle}>Системная тема</span>
      </div>
      <span className={styles.description}>
        Сайт автоматически подстраивается к системной теме.
      </span>
    </div>
  );
}
