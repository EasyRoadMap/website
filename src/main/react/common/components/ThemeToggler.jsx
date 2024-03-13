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
    <div>
      <button onClick={handleLightThemeClick} className={styles.button}>
        Light
      </button>
      <button onClick={handleDarkThemeClick} className={styles.button}>
        Dark
      </button>
    </div>
  );
}


