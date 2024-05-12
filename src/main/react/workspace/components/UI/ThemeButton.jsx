import { useTheme } from "../../hooks/useTheme.js";
import { useState } from "react";
import { useEffect } from "react";
import darkThemeSVG from "../../../assets/darkTheme.jsx";
import lightThemeSVG from "../../../assets/lightTheme.jsx";
import styles from "./themeButton.module.css";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import CheckThemeDropdownSVG from "../../../assets/checkThemeDropdownSVG.jsx";

const themeTitle = {
  light: "Светлая",
  dark: "Темная",
  default: "Системная",
};

export default function ThemeButton() {
  const [icon, setIcon] = useState(null);
  const { theme, setTheme } = useTheme();
  const [showed, setShowed] = useState(false);

  const handleThemeButtonClick = (type) => {
    setTheme(type);
    if (theme !== type) setShowed(false);
  };

  useEffect(() => {
    if (theme === "light") {
      setIcon(lightThemeSVG);
    } else if (theme === "dark") {
      setIcon(darkThemeSVG);
    } else if (theme === "default") {
      // Определяем иконку в зависимости от текущей темы
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIcon(darkThemeSVG);
      } else {
        setIcon(lightThemeSVG);
      }
    }
  }, [theme]);

  return (
    <OutsideAlerter
      callback={() => setShowed(false)}
      style={{ width: "fit-content", height: "20px" }}
    >
      <div className={styles.dropdownTheme}>
        <div className={styles.logoAndButtonwrapper} style={{ height: "21px" }}>
          {theme === "light" ? <div>{icon}</div> : <div>{icon}</div>}
          <div className={styles.wholeText} style={{ height: "21px" }}>
            <span className={styles.unclickableText}>Тема:&nbsp;</span>
            <span
              onClick={() => setShowed((prev) => !prev)}
              className={styles.chosenThemeButton}
            >
              {themeTitle[theme]}
            </span>
          </div>
        </div>

        <div
          className={styles.dropdownThemeContent}
          style={{ display: showed ? "block" : "none" }}
        >
          <div className={styles.dropdownThemeButtons}>
            <button
              className={styles.ChangeThemeDropdown}
              onClick={() => handleThemeButtonClick("light")}
            >
              <span className={styles.buttonTheme}>Светлая</span>
              <CheckThemeDropdownSVG className={styles.checkThemeDropdownSVG} />
            </button>

            <button
              className={styles.ChangeThemeDropdown}
              onClick={() => handleThemeButtonClick("dark")}
            >
              <span className={styles.buttonTheme}>Темная</span>
              <CheckThemeDropdownSVG className={styles.checkThemeDropdownSVG} />
            </button>

            <button
              className={styles.ChangeThemeDropdown}
              onClick={() => handleThemeButtonClick("default")}
            >
              <span className={styles.buttonTheme}> Системная</span>
              <CheckThemeDropdownSVG className={styles.checkThemeDropdownSVG} />
            </button>
          </div>
        </div>
      </div>
    </OutsideAlerter>
  );
}
