import Header from "../components/header/Header.jsx";
import styles from "./createWorkspace.module.css";
import ThemeButton from "../components/UI/ThemeButton.jsx";

import { useUserInfo } from "../hooks/useUser.jsx";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
// import { useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

// import useUserContext from "../hooks/useUserContext.js";
// import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const BaseCreateWorkspace = ({ children }) => {
  const {
    user,
    currentWorkspace,
    setCurrentWorkspace,
    User,
    Workspaces,
    Photo,
    DeleteUser,
    UpdateUser,
    getUserWorkspaceById,
  } = useUserInfo();
  const { Workspace, CreateWorkspace, Members, Projects } = useWorkspaceInfo();
  const { setProjectContext } = useProjectContext();

  useEffect(() => {
    clearProjectHighlight();
  }, []);

  const clearProjectHighlight = () => {
    if (location.pathname !== "/workspace/project") setProjectContext({});
  };

  return (
    <main className={styles.main}>
      <Header
        DeleteUser={DeleteUser}
        UpdateUser={UpdateUser}
        CreateWorkspace={CreateWorkspace}
        currentWorkspace={currentWorkspace}
      />
      <div className={styles.themeButton}>
        <ThemeButton />
      </div>
      <section className={styles.content}>
        <section className={styles.centeredContentWorkspace}>
          {children}
        </section>
      </section>
    </main>
  );
};

export default BaseCreateWorkspace;
