import styles from "./styles.module.css";
import Sidebar from "../compoments/sidebar/Sidebar.jsx";
import Header from "../compoments/header/Header.jsx";

import { useParams } from "react-router-dom";

import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import { useWorkspaceAPI } from "../hooks/useWorkspaceAPI.js";
import useProjectContext from "../hooks/useProjectContext.js";
import { useProjectAPI } from "../hooks/useProjectAPI.js";

import { useRef } from "react";

const Base = ({ children }) => {
  const params = useParams();
  const ws_id = params.ws_id;
  const pr_id = params.pr_id;

  const { GetWorkspace } = useWorkspaceAPI();
  const { workspaceContext } = useWorkspaceContext();
  const { GetProject } = useProjectAPI();
  const { projectContext } = useProjectContext();

  if (workspaceContext?.id !== ws_id) {
    GetWorkspace(ws_id);
  }

  if (pr_id && projectContext?.id !== pr_id) {
    GetProject(pr_id);
  }

  const sidebarRef = useRef(null);

  return (
    <main className={styles.main}>
      <Header sidebarRef={sidebarRef}/>
      <section className={styles.content}>
        <Sidebar sidebarRef={sidebarRef}/>
        <section className={styles.centeredContent}>{children}</section>
      </section>
    </main>
  );
};

export default Base;
