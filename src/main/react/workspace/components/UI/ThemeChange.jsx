import styles from "./styleUI.module.css";
import Switch from "./switch.jsx";
import DarkThemeLayoutSVG from "../../../assets/darkThemelayoutSVG.jsx";
import LightThemeLayoutSVG from "../../../assets/lightThemeLayoutSVG.jsx";
import { useEffect, useState } from "react";

import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { IntToRGBA } from "../../utils/RGBAToIntConverter.js";

export default function ThemeChange() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);

  const { workspaceContext } = useWorkspaceContext();
  const { PutAppearance } = useWorkspaceInfo();

  useEffect(() => {
    if (!workspaceContext?.appearance?.theme) return;
    setTheme(workspaceContext.appearance.theme);
  }, workspaceContext?.appearance)

  const onSwitchChange = () => {
    setChecked((prev) => !prev);
  }

  const chooseTheme = (newTheme) => {
    if (theme === newTheme) return;
    if (!workspaceContext?.id || !workspaceContext?.appearance?.accent_color) return;
    const color_rgba = IntToRGBA( workspaceContext.appearance.accent_color);
    PutAppearance(workspaceContext.id, newTheme, color_rgba);
    setTheme(newTheme);
  }

  return (
    <div className={styles.themeWrapper}>
      <span className={styles.title}>Тема</span>
      <span className={styles.description}>
        Выберите тему сайта либо оставьте по умолчанию.
      </span>
      <div className={styles.themeChangeBlock}>
        <LightThemeLayoutSVG
          onClick={checked ? () => {} : () => chooseTheme("light")}
          active={theme === "light"}
        />
        <DarkThemeLayoutSVG
          onClick={checked ? () => {} : () => chooseTheme("dark")}
          active={theme === "dark"}
        />
      </div>
      <div className={styles.switchBlock}>
        <Switch checked={checked} onChange={onSwitchChange}/>
        <span className={styles.systemThemeTitle}>Системная тема</span>
      </div>
      <span className={styles.description}>
        Сайт автоматически подстраивается к системной теме.
      </span>
    </div>
  );
}
