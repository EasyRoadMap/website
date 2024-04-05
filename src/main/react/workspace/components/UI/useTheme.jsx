import { useTheme } from "../../hooks/theme.js";
import { useState } from "react";
import { useEffect } from "react";
import darkThemeSVG from "../../../assets/darkTheme.jsx";
import lightThemeSVG from "../../../assets/lightTheme.jsx";
import styles from "./styleUI.module.css";
const themeTitle = {
  light: "Светлая",
  dark: "Темная",
  default: "Системная",
};

export default function ThemeButton() {
  const [icon, setIcon] = useState(null);
  const [title, setTitle] = useState(null);
  const { theme, setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };
  const handleDefaultThemeClick = () => {
    setTheme("default");
  };

  useEffect(() => {
    if (theme === "light") {
      setIcon(lightThemeSVG);
      setTitle("Светлая");
    } else if (theme === "dark") {
      setIcon(darkThemeSVG);
      setTitle("Темная");
    } else if (theme === "default") {
      // Определяем иконку в зависимости от текущей темы
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIcon(darkThemeSVG);
        setTitle("Системная");
      } else {
        setIcon(lightThemeSVG);
        setTitle("Системная");
      }
    }
  }, [theme]);

  return (
    <div className={styles.dropdownTheme}>
      {theme === "light" ? <div>{icon}</div> : <div>{icon}</div>}
      <button>{themeTitle[theme]}</button>
      <div className={styles.dropdownThemeContent}>
        <button onClick={handleLightThemeClick} className={styles.buttonTheme}>
          Светлая
        </button>
        <button onClick={handleDarkThemeClick} className={styles.buttonTheme}>
          Темная
        </button>
        <button
          onClick={handleDefaultThemeClick}
          className={styles.buttonTheme}
        >
          Системная
        </button>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import lightThemeSVG from "../../../assets/lightTheme.jsx";
// import darkThemeSVG from "../../../assets/darkTheme.jsx";
// import { useTheme } from "../../hooks/theme.js";
// import styles from "./styleUI.module.css";

// // Объект для хранения названий тем
// const themeTitle = {
//   light: "Светлая",
//   dark: "Темная",
//   default: "Системная",
// };

// export default function ThemeButton() {
//   const [icon, setIcon] = useState(null);
//   const [title, setTitle] = useState(null);
//   const { theme, setTheme } = useTheme();

//   // Эффект для установки иконки и заголовка при изменении темы
//   useEffect(() => {
//     if (theme === "light") {
//       setIcon(lightThemeSVG);
//       setTitle("Светлая");
//     } else if (theme === "dark") {
//       setIcon(darkThemeSVG);
//       setTitle("Темная");
//     } else if (theme === "default") {
//       handleSystemThemeChange();
//       setTitle("Системная");
//       console.log("frwbfijwf");
//     }
//   }, [theme]);

//   // Обработчики клика для установки соответствующих тем
//   const handleLightThemeClick = () => {
//     setTheme("light");
//   };

//   const handleDarkThemeClick = () => {
//     setTheme("dark");
//   };

//   const handleSystemThemeClick = () => {
//     setTheme("default");
//     console.log("default");
//   };

//   // Функция для обработки изменения системной темы
//   const handleSystemThemeChange = () => {
//     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//       .matches
//       ? "dark"
//       : "light"; // Определение системной темы
//     setTheme((pref) => {
//       console.log(pref);
//       console.log(systemTheme);
//       return systemTheme;
//     }); // Установка системной темы
//   };

//   return (
//     <div className={styles.dropdownTheme}>
//       <div>{icon}</div>
//       <button>{themeTitle[theme]}</button>
//       <div className={styles.dropdownThemeContent}>
//         <button onClick={handleLightThemeClick} className={styles.buttonTheme}>
//           Светлая
//         </button>
//         <button onClick={handleDarkThemeClick} className={styles.buttonTheme}>
//           Темная
//         </button>
//         <button onClick={handleSystemThemeClick} className={styles.buttonTheme}>
//           Системная
//         </button>
//       </div>
//     </div>
//   );
// }
