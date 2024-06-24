import UserHeaderButton from "./UserHeaderButton.jsx";
import HeaderLogo from "./HeaderLogo.jsx";
import MenuHeaderSVG from "../../../assets/menuHeaderSVG.jsx";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

import useUserContext from "../../hooks/useUserContext.js";

const Header = ({ DeleteUser, UpdateUser, workspaces, currentWorkspace, sidebarRef }) => {
  const { userContext } = useUserContext();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 1000)
        sidebarRef.current.style.display = "none";
      else 
        sidebarRef.current.style.display = "flex";
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const toggleMenu = () => {
    if (!sidebarRef.current) return;

    sidebarRef.current.classList.toggle("active");

    const isMenuOpened = sidebarRef.current.classList.contains("active");

    if (isMenuOpened) {
      sidebarRef.current.style.display = "flex";
      return;
    }
    sidebarRef.current.style.display = "none";
  }

  return (
    <header className={styles.header}>
      {screenWidth < 1000 && (
        <MenuHeaderSVG
          className={styles.menuHeader}
          onClick={toggleMenu}
        />
      )}
      <HeaderLogo />
      <UserHeaderButton
        user={userContext}
        DeleteUser={DeleteUser}
        UpdateUser={UpdateUser}
        currentWorkspace={currentWorkspace}
      />
    </header>
  );
};

export default Header;
