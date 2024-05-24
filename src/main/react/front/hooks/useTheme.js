import { useLayoutEffect, useState } from "react";

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";
const storageKey = "app-theme-tab2";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem(storageKey) || "default"
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "default" ? defaultTheme : theme
    );
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  return { theme, setTheme };
};
