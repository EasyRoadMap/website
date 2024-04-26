import React from 'react';
import {createContext, useState} from "react";

const RoadmapContext = createContext({});

export const RoadmapProvider = ({ children }) => {
    const [roadmapContext, setRoadmapContext] = useState({});
    const [chosenStage, setChosenStage] = useState(null);

    return (
        <RoadmapContext.Provider value={{ roadmapContext, setRoadmapContext, chosenStage, setChosenStage }}>
            {children}
        </RoadmapContext.Provider>
    );
};

export default RoadmapContext;