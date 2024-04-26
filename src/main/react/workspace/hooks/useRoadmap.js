import { useState, useEffect } from "react";
import useRoadmapContext from "./useRoadmapContext.js";
import { getStagesPage } from "../api/roadmap-api/getStagesPage.js";

export const useRoadmapInfo = () => {
    const [roadmap, setRoadmap] = useState({});
    const { setRoadmapContext } = useRoadmapContext();

    const getStages = (pr_id) => { 
        getStagesPage(pr_id, 1).then((response) => {
            const stages = response.data.content;
            getStagesPage(pr_id, response.data.pagination.total_pages-1).then((response) => {
                setRoadmapContext((prev) => ({...prev, stages: stages.concat(response.data.content)}));
            })
        }) 
    }

    
}