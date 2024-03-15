import { useTheme } from "../hooks/use-theme";
import styles from "../styles.module.css";
export default function ThemeToggler(){
const { setTheme } = useTheme();

const handleLightThemeClick = () => {
  setTheme("light");
};
const handleDarkThemeClick = () => {
  setTheme("dark");
};

  return (
    <div className={styles.theme}>
            <button onClick={handleLightThemeClick} className={styles.button_theme}>
              ☀️
            </button>

            <button onClick={handleDarkThemeClick} className={styles.button_theme}>
              🌙
            </button>
    </div>
  );
}


