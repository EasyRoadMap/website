import React from 'react';
import {createContext, useState} from "react";

const RoadmapContext = createContext({});

export const RoadmapProvider = ({ children }) => {
    const [roadmapContext, setRoadmapContext] = useState({});

    return (
        <RoadmapContext.Provider value={{ roadmapContext, setRoadmapContext }}>
            {children}
        </RoadmapContext.Provider>
    );
};

export default RoadmapContext;