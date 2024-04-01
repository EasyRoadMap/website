import { useTheme } from "../hooks/theme.js";

export default function useTheme() {
  const { theme, setTheme } = useTheme();
  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  return <button></button>;
}
