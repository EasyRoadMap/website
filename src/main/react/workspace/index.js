import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { UserProvider } from "./context/UserContextProvider.js";
import { WorkspaceProvider } from "./context/WorkspaceContextProvider.js";
import { ProjectProvider } from "./context/ProjectContextProvider.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { isAppropriateViewport } from "./utils/isAppropriateViewport.js";
import NoMobileVersion from "./components/UI/noMobileVersion.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // isAppropriateViewport() ?
  <UserProvider>
    <WorkspaceProvider>
      <ProjectProvider>
        <BrowserRouter>
          {/* <Routes> */}
          <App />
          {/* </Routes> */}
        </BrowserRouter>
      </ProjectProvider>
    </WorkspaceProvider>
  </UserProvider>
  // :
  // <NoMobileVersion pageName="workspace"/>
);
