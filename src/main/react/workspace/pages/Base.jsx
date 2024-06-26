import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import styles from "./styles.module.css";
import ThemeButton from "../components/UI/ThemeButton.jsx";

import { useUserInfo } from "../hooks/useUser.jsx";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useProjectContext from "../hooks/useProjectContext.js";

import { useEffect, useRef } from "react";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

import ErrorsWindow from "../errors/errorsWindow.jsx";


const Base = ({children}) => {
  const { currentWorkspace, DeleteUser, UpdateUser } = useUserInfo();
  const { CreateWorkspace } = useWorkspaceInfo();
  const { setProjectContext } = useProjectContext();
  const { workspaceContext } = useWorkspaceContext();

  useEffect(() => {
    clearProjectHighlight();
  }, []);

  const clearProjectHighlight = () => {
    if (location.pathname !== "/workspace/project") setProjectContext({});
  };

  const sidebarRef = useRef(null);

  return (
    
    <main className={styles.main}>
      <ErrorsWindow>
    <Header  DeleteUser={DeleteUser} UpdateUser={UpdateUser} currentWorkspace={currentWorkspace} sidebarRef={sidebarRef}/>
      <div className={styles.themeButton}>
        <ThemeButton />
      </div>
      <section className={styles.content}>
        <Sidebar sidebarRef={sidebarRef}/>
        <section className={styles.centeredContent}>{children}</section>
      </section>
      </ErrorsWindow>
    </main>
  );
};

export default Base;