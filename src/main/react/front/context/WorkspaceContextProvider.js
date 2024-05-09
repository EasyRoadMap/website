import React from 'react';
import {createContext, useState} from "react";

const WorkspaceContext = createContext({});

export const WorkspaceProvider = ({ children }) => {
    const [workspaceContext, setWorkspaceContext] = useState({});

    return (
        <WorkspaceContext.Provider value={{ workspaceContext, setWorkspaceContext }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContext;