import React, { useEffect } from 'react';
import {createContext, useState} from "react";

const RoadmapContext = createContext({});

export const RoadmapProvider = ({ children }) => {
    const [roadmapContext, setRoadmapContext] = useState({});
    const [chosenStage, setChosenStage] = useState(null);

    useEffect(() => {
        setRoadmapContext((prev) => ({...prev, tasks: null}));
        console.debug("chosen stage actually chosen", [chosenStage, roadmapContext]);
    }, [chosenStage])

    useEffect(() => {
        console.debug("roadmapContext was updated", roadmapContext);
    }, [roadmapContext])

    return (
        <RoadmapContext.Provider value={{ roadmapContext, setRoadmapContext, chosenStage, setChosenStage }}>
            {children}
        </RoadmapContext.Provider>
    );
};

export default RoadmapContext;