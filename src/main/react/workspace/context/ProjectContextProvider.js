import React from 'react';
import {createContext, useState} from "react";

const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
    const [projectContext, setProjectContext] = useState({});
    const [projectId, setProjectId] = useState(null);

    return (
        <ProjectContext.Provider value={{ projectContext, setProjectContext, projectId, setProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;