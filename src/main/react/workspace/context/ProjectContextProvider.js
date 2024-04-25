import React from 'react';
import {createContext, useState} from "react";

const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
    const [projectContext, setProjectContext] = useState({});

    return (
        <ProjectContext.Provider value={{ projectContext, setProjectContext }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;