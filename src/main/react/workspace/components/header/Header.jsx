import UserHeaderButton from "./UserHeaderButton.jsx";
import HeaderLogo from "./HeaderLogo.jsx";
import MenuHeaderSVG from "../../../assets/menuHeaderSVG.jsx";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

import useUserContext from "../../hooks/useUserContext.js";

const Header = ({ DeleteUser, UpdateUser, workspaces, currentWorkspace }) => {
  const { userContext } = useUserContext();

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
