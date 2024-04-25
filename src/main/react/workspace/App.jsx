import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Projects from "./pages/Projects.jsx";
import Project from "./pages/Project.jsx";
import "./global.css";
import { StrictMode } from "react";
import { PopupProvider } from "react-popup-manager";
import { UserProvider } from "./context/UserContextProvider.js";
import { WorkspaceProvider } from "./context/WorkspaceContextProvider.js";
import { ProjectProvider } from "./context/ProjectContextProvider.js";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <PopupProvider>
      <UserProvider>
        <WorkspaceProvider>
          <ProjectProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/workspace" element={<Main />} />
                <Route path="/workspace/projects" element={<Projects />} />
                <Route path="/workspace/project" element={<Project />} />
                <Route path="/workspace/settings" element={<Settings />} />
              </Routes>
            </BrowserRouter>
          </ProjectProvider>
        </WorkspaceProvider>
      </UserProvider>
    </PopupProvider>
  );
}

export default App;
