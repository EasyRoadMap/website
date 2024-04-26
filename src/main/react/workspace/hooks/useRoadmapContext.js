import { useContext } from "react";
import RoadmapContext from "../context/RoadmapContextProvider";

const useRoadmapContext = () => {
    return useContext(RoadmapContext);
}

export default useRoadmapContext;