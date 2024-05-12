import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import Project from "./pages/Project.jsx";
import "./global.css";
import { StrictMode, useEffect, useState } from "react";
import { PopupProvider } from "react-popup-manager";
import { UserProvider } from "./context/UserContextProvider.js";
import WorkspaceContext, {
  WorkspaceProvider,
} from "./context/WorkspaceContextProvider.js";
import { ProjectProvider } from "./context/ProjectContextProvider.js";
import { RoadmapProvider } from "./context/RoadmapContextProvider.js";
import Settings from "./pages/Settings.jsx";
// import CreateWorkspace from "./pages/CreateWorkspace.jsx";

import { useUserInfo } from "./hooks/useUser.jsx";
import { useWorkspaceInfo } from "./hooks/useWorkspace.jsx";
import useProjectContext from "./hooks/useProjectContext.js";
import useWorkspaceContext from "./hooks/useWorkspaceContext.js";

import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { addWSID } from "./utils/WSIDStorage.js";

function App() {
  const {
    user,
    currentWorkspace,
    setCurrentWorkspace,
    User,
    Workspaces,
    Photo,
  } = useUserInfo();
  const { Workspace, Members, Projects, checkWorkspace } = useWorkspaceInfo();
  const { projectId, setProjectContext } = useProjectContext();
  const { workspaceContext } = useWorkspaceContext();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const ws = getWSFromURL();
    console.debug("WS_ID");
    console.debug(ws);
    if (ws && ws.ws_id && workspaceContext.workspaceExists) {
      User();
      setCurrentWorkspace(ws.ws_id);
      Workspaces();
      Photo();
      Workspace(ws.ws_id);
      Members(ws.ws_id);
      Projects(ws.ws_id);
      return;
    }
    console.debug("no found ws id");
    User();
    Workspaces(setCurrentWorkspace);
    Photo();
  }, [workspaceContext?.workspaceExists]);

  useEffect(() => {
    console.debug("currentWorkspace was updated with value", currentWorkspace);
    if (user.workspaces?.length > 0 && currentWorkspace?.id) {
      Workspace(currentWorkspace.id);
      Members(currentWorkspace.id);
      Projects(currentWorkspace.id);
      updateURLWithNewWS(currentWorkspace.id);
    } else {
      navigate({
        pathname: "/workspace",
      });
    }
  }, [currentWorkspace]);

  const getWSFromURL = () => {
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (queryParams.ws_id) {
      checkWorkspace(queryParams.ws_id);
    }
    return queryParams;
  };

  const updateURLWithNewWS = (ws) => {
    console.debug("started updateURLWithNewWS with value", ws);
    if (!ws || !workspaceContext?.workspaceExists) return;
    console.debug("updateURLWithNewWS condition passed");
    // if (ws && !ws.pr_id && setProjectContext) setProjectContext({});
    // const searchParam = Object.keys(ws).length === 2 ? '?ws_id='+ws.ws_id+"&pr_id="+ws.pr__id : '?ws_id='+ws.ws_id;
    addWSID(ws);
    navigate({
      pathname: "/workspace",
      search: "?ws_id=" + ws,
    });
  };

  const clearProjectHighlight = () => {
    if (location.pathname !== "/workspace/project") setProjectContext({});
  };

  return (
    <PopupProvider>
      {/* <UserProvider>
        <WorkspaceProvider>
          <ProjectProvider>
            <BrowserRouter> */}
            <RoadmapProvider>
              <Routes>
                  <Route path="/workspace" element={<Main key={workspaceContext.id + "main"}/>} />
                  <Route path="/workspace/projects" element={<ProjectsPage key={workspaceContext.id + "projects"}/>} />
                  <Route path="/workspace/project" element={<Project key={workspaceContext.id + "" + projectId}/>} />
                  <Route path="/workspace/settings" element={<Settings key={workspaceContext.id + "settings"}/>} />
                  <Route path="/workspace/invite" element={<Main fromInvite={true} key={workspaceContext.id + "maininvite"}/>} />
                </Routes>
            </RoadmapProvider>
            {/* </BrowserRouter>
          </ProjectProvider>
        </WorkspaceProvider>
      </UserProvider> */}
    </PopupProvider>
  );
}

export default App;
