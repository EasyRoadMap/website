import { useLayoutEffect, useState } from "react";

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "default"
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "default" ? defaultTheme : theme
    );
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
