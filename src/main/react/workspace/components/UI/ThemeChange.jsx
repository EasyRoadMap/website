import styles from "./styleUI.module.css";
import Switch from "./switch.jsx";
import DarkThemeLayoutSVG from "../../../assets/darkThemelayoutSVG.jsx";
import LightThemeLayoutSVG from "../../../assets/lightThemeLayoutSVG.jsx";
import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme.js";

export default function ThemeChange() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.themeWrapper}>
      <span className={styles.title}>Тема</span>
      <span className={styles.description}>
        Выберите тему сайта либо оставьте по умолчанию.
      </span>
      <div className={styles.themeChangeBlock}>
        <LightThemeLayoutSVG
          onClick={() => setTheme("light")}
          active={theme === "light"}
        />
        <DarkThemeLayoutSVG
          onClick={() => setTheme("dark")}
          active={theme === "dark"}
        />
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
