import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import styles from "./styles.module.css";

import { useUserInfo } from "../hooks/useUser.jsx";
import { useWorkspaceInfo } from "../hooks/useWorkspace.jsx";
// import { useEffect, useState } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

// import useUserContext from "../hooks/useUserContext.js";
// import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const Base = ({children}) => {
  const { user, currentWorkspace, setCurrentWorkspace, User, Workspaces, Photo, DeleteUser, UpdateUser, getUserWorkspaceById } = useUserInfo();
  const { Workspace, CreateWorkspace, Members, Projects } = useWorkspaceInfo();

  const location = useLocation();
  const navigate = useNavigate();

  console.log("Base data", user);
  console.log(currentWorkspace);
  // const { user, currentWorkspace, setCurrentWorkspace, User, Workspaces, Photo } = useUserInfo();
  // const { Workspace } = useWorkspaceInfo();
  // const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    const ws = getWSFromURL();
    console.log("WSWSWS");
    console.log(ws);
    if (Object.keys(ws).length !== 0) {
      console.log();
      User();
      console.log("OOOOO");
      console.log(ws.ws_id);
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
    console.log("second useef");
    console.log(currentWorkspace);
    console.log(user);
    if (user.workspaces?.length > 0) {
      console.log("updating workspaces in App");
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
    const searchParam = Object.keys(ws).length === 2 ? '?ws_id='+ws.ws_id+"&pr_id="+ws.pr__id : '?ws_id='+ws.ws_id;
    navigate({
      pathname: location.pathname,
      search: searchParam
    })
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