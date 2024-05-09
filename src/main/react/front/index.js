import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { WorkspaceProvider } from "./context/WorkspaceContextProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <WorkspaceProvider>
            <App />
        </WorkspaceProvider>
    </BrowserRouter>
);
