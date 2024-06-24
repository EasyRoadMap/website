import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { UserProvider } from "./context/UserContextProvider.js";
import { WorkspaceProvider } from "./context/WorkspaceContextProvider.js";
import { ProjectProvider } from "./context/ProjectContextProvider.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <WorkspaceProvider>
            <ProjectProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ProjectProvider>
        </WorkspaceProvider>
    </UserProvider>
);