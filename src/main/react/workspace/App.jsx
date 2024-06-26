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
import { ErrorProvider } from "./context/ErrorContextProvider.js";
import Settings from "./pages/Settings.jsx";
// import CreateWorkspace from "./pages/CreateWorkspace.jsx";

import { useUserInfo } from "./hooks/useUser.jsx";
import useUserContext from "./hooks/useUserContext.js";
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
  const { setFirstAnswerReceived } = useUserContext();

  const [projectIdFromParams, setProjectIdFromParams] = useState(null);
  const [workspacesReceived, setWorkspacesReceived] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();


  // const initializeUser = (onGettingWorkspaces) => {
  //   User();
  //   Workspaces(onGettingWorkspaces);
  //   Photo();
  // }

  // const initializeWorkspace = (ws_id) => {
  //   // setCurrentWorkspace(ws.ws_id);
  //   Workspace(ws_id);
  //   Members(ws_id);
  //   Projects(ws_id);
  // }

  // const checkWorkspaceId = (ws_id) => {
  //   let wsFound = false;
  //     initializeUser((ws) => {
  //       if (ws != null) {
  //         wsFound = true;
  //       }
  //     }, ws_id);

  //     if (wsFound) {
  //       initializeWorkspace(ws_id);
  //       setCurrentWorkspace(ws);
  //       return true;
  //     }

  //     return false;
  // }

  // useEffect(() => {
  //   const params = getWSFromURL();
  //   let rightWsId = false;

  //   if (!params) {
  //     // initializeUser((ws) => setCurrentWorkspace(ws));
  //   }
  //   else if (params.ws_id && !params.pr_id) {
  //     if (checkWorkspaceId()) rightWsId = true;
  //   }
  //   else if (params.ws_id && params.pr_id) {
  //     if (checkWorkspaceId()) {
  //       rightWsId = true;
  //       navigate()
  //     }
  //   }

  //   initializeUser((ws) => {
  //     if (params) {
  //       if (ws == null) setWorkspacesReceived(true);
  //       else setWorkspacesReceived(false);
  //       setCurrentWorkspace(ws);
  //     }
  //   })
  // }, []);

  // useEffect(() => {
  //   if (workspacesReceived === null) return;

  //   if (workspacesReceived === true && user.workspaces?.length > 0 && currentWorkspace?.id) {
  //     initializeWorkspace(currentWorkspace.id);
  //     updateURL(currentWorkspace.id);
  //   }
  //      else {
  //       navigate({
  //         pathname: "/workspace",
  //       });
  //     }
  // }, [workspacesReceived]);

  useEffect(() => {
    console.log("ue1");
    const ws = getWSFromURL();
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
    console.log("damn", ws);
    addProjectIdFromURL(ws?.pr_id);
    User();
    Workspaces((ws) => {setCurrentWorkspace(ws);});
    Photo();
  }, [workspaceContext?.workspaceExists]);

  // useEffect(() => {
  //   if (projectIdFromParams == null || workspaceContext?.projects == null || !currentWorkspace.id) return;
  //   navigate({
  //     pathname: "/workspace/project",
  //     search: '?ws_id='+currentWorkspace.id+"&pr_id="+projectIdFromParams,
  //   });
  //   setProjectIdFromParams(null);
  // }, [workspaceContext?.projects]);

  useEffect(() => {
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

  // const updateURL = (params) => {
  //   if (!ws || !workspaceContext?.workspaceExists) return;
  //   if (ws && !ws.pr_id && setProjectContext) setProjectContext({});

  //   const searchPath = (ws.ws_id && ws.pr_id) ?
  //     {
  //       pathname: "/workspace/project",
  //       search: '?ws_id='+ws.ws_id+"&pr_id="+ws.pr_id,
  //     } :
  //     {
  //       pathname: "/workspace",
  //       search: '?ws_id='+ws.ws_id
  //     };

  //   addWSID(ws);

  //   navigate(searchPath);
  // };

  const updateURLWithNewWS = (ws) => {
    if (!ws || !workspaceContext?.workspaceExists) return;
    // if (ws && !ws.pr_id && setProjectContext) setProjectContext({});
    // const searchParam = Object.keys(ws).length === 2 ? '?ws_id='+ws.ws_id+"&pr_id="+ws.pr__id : '?ws_id='+ws.ws_id;
    addWSID(ws);
    navigate({
      pathname: "/workspace",
      search: "?ws_id=" + ws,
    });
  };

  const addProjectIdFromURL = (pr_id) => {
    if (pr_id == null) return;
    setProjectIdFromParams(pr_id);
  }

  const clearProjectHighlight = () => {
    if (location.pathname !== "/workspace/project") setProjectContext({});
  };

  return (
    <ErrorProvider>
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
    </ErrorProvider>
  );
}

export default App;
