import HeaderLogo from "./HeaderLogo.jsx";
import ThemeChange from "./ThemeChange.jsx";
import MenuHeaderSVG from "../../../assets/menuHeaderSVG.jsx";
import styles from "./style.module.css";
import { useState, useEffect } from "react";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      {screenWidth < 1000 && (
        <MenuHeaderSVG
          className={styles.menuHeader}
          // onClick={() => {
          //   document.querySelector(".sidebar").classList.toggle("active");
          // }}
        />
      )}
      <HeaderLogo />
      <ThemeChange />
    </header>
  );
};

export default Header;
