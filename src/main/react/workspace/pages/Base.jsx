import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import styles from "./styles.module.css";

import { useUserInfo } from "../hooks/useUser.jsx";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
// import { useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

// import useUserContext from "../hooks/useUserContext.js";
// import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const Base = ({children}) => {
  const { user, currentWorkspace, setCurrentWorkspace, User, Workspaces, Photo, DeleteUser, UpdateUser, getUserWorkspaceById } = useUserInfo();
  const { Workspace, CreateWorkspace, Members, Projects } = useWorkspaceInfo();
  const { setProjectContext } = useProjectContext();

  const location = useLocation();
  const navigate = useNavigate();
  // const { user, currentWorkspace, setCurrentWorkspace, User, Workspaces, Photo } = useUserInfo();
  // const { Workspace } = useWorkspaceInfo();
  // const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    clearProjectHighlight();
    const ws = getWSFromURL();
    if (Object.keys(ws).length !== 0) {
      User();
      Workspace(ws.ws_id);
      setCurrentWorkspace(ws.ws_id);
      Workspaces();
      Photo();
      Workspace(ws.ws_id);
      Members(ws.ws_id);
      Projects(ws.ws_id);
      return;
    }
    User();
    Workspaces(setCurrentWorkspace);
    Photo();
  }, []);

  useEffect(() => {
    if (user.workspaces?.length > 0) {
      Workspace(currentWorkspace.id);
      Members(currentWorkspace.id);
      Projects(currentWorkspace.id);
      updateURLWithNewWS(currentWorkspace.id);
    }
  }, [currentWorkspace]);

  // useEffect(() => {
  //   console.log("updating context!");
  //   setUserContext(user);
  // }, [user])

  const getWSFromURL = () => {
    return qs.parse(location.search, { ignoreQueryPrefix: true })
  }

  const updateURLWithNewWS = (ws) => {
    // if (ws && !ws.pr_id && setProjectContext) setProjectContext({});
    const searchParam = Object.keys(ws).length === 2 ? '?ws_id='+ws.ws_id+"&pr_id="+ws.pr__id : '?ws_id='+ws.ws_id;
    navigate({
      pathname: location.pathname,
      search: searchParam
    })
  }

  const clearProjectHighlight = () => {
    if (location.pathname !== "/workspace/project") setProjectContext({});
  }

  return (
    <main className={styles.main}>
      <Header  DeleteUser={DeleteUser} UpdateUser={UpdateUser} CreateWorkspace={CreateWorkspace} currentWorkspace={currentWorkspace}/>
      <section className={styles.content}>
        <Sidebar />
        <section className={styles.centeredContent}>
            {children}
        </section>
      </section>
    </main>
  );
};

export default Base;