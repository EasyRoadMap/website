import React from 'react';
import {createContext, useState, useEffect} from "react";

const WorkspaceContext = createContext({});

export const WorkspaceProvider = ({ children }) => {
    const [workspaceContext, setWorkspaceContext] = useState({});

    useEffect(() => {
        console.debug("workspace global state has been changed to", workspaceContext);
    }, [workspaceContext])

    return (
        <WorkspaceContext.Provider value={{ workspaceContext, setWorkspaceContext }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContext;