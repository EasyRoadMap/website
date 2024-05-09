import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./pages/Project.jsx";
import Main from "./pages/Main.jsx";
import { useEffect } from "react";
import { ProjectProvider } from "./context/ProjectContextProvider.js";
import useWorkspaceContext from "./hooks/useWorkspaceContext.js";
import { setAppearance, getAccentColor } from "./utils/CSSRoots.js";

function App() {
  const { workspaceContext } = useWorkspaceContext();

  useEffect(() => {
    if (workspaceContext?.appearance?.accent_color && 
      getAccentColor() != workspaceContext?.appearance?.accent_color) {
        setAppearance(workspaceContext.appearance.accent_color);
      }
  }, [workspaceContext]);

  return (
      <Routes>
        <Route 
          path="/p/:ws_id/:pr_id" 
          element={
            <ProjectProvider>
              <Project />
            </ProjectProvider>
          } 
        />
        <Route 
          path="/p/:ws_id" 
          element={<Main />} 
        />
      </Routes>
  );
}

export default App;
