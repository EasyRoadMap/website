import DarkThemeSVGVisitor from "../../../assets/darkThemeSVGVisitor.jsx";
import LightThemeSVGVisitor from "../../../assets/lightThemeSVGVisitor.jsx";
import styles from "./style.module.css";
import { useTheme } from "../../../workspace/hooks/useTheme";

const ThemeChange = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={styles.themeChange}
      onClick={
        theme === "light" ? () => setTheme("dark") : () => setTheme("light")
      }
    >
      {theme === "light" ? (
        <LightThemeSVGVisitor className={styles.iconTheme} />
      ) : (
        <DarkThemeSVGVisitor className={styles.iconTheme} />
      )}
    </div>
  );
};
export default ThemeChange;
