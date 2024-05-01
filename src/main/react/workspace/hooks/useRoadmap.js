import { useState, useEffect } from "react";
import useRoadmapContext from "./useRoadmapContext.js";
import { getStagesPage } from "../api/roadmap-api/getStagesPage.js";
import { createStage } from "../api/roadmap-api/createStage.js";
import { getTasksPage } from "../api/roadmap-api/getTasksPage.js"
import { createTask } from "../api/roadmap-api/createTask.js"
import { getStage } from "../api/roadmap-api/getStage.js";

export const useRoadmapInfo = () => {
    const [roadmap, setRoadmap] = useState({});
    const { roadmapContext, setRoadmapContext } = useRoadmapContext();

    // useEffect(() => {

    // }, [roadmap])

    const getStages = (pr_id, callback) => { 
        console.log("WTF");
        getStagesPage(pr_id, 1).then((response) => {
            const stages = response.data.content;
            if (response.status === 204) {
                setRoadmapContext((prev) => ({...prev, stages: []}));
                return;
            }
            if (response?.data?.pagination?.total_pages-1 === 0) {
                setRoadmapContext((prev) => ({...prev, stages: stages}));
                return;
            }
            if (response.data) {
                for (let i = 2; i <= response.data.pagination.total_pages; i++) {
                    getStagesPage(pr_id, i).then((response) => {
                        setRoadmapContext((prev) => ({...prev, stages: stages.concat(response.data.content)}));
                    })
                }
            }
            if (callback) callback();
        }) 
    }

    const Stage = (rms_id) => {
        getStage(rms_id).then((response) => {
            setRoadmapContext((prev) => ({...prev, stages: [... new Set(prev.stages.concat([response.data]))] }));
        })
    }

    const CreateStage = (pr_id, name, onSuccess) => {
        createStage(pr_id, name).then((response) => {
            getStages(pr_id);
            onSuccess();
        }).catch((e) => {
            console.log("error in Create Stage");
            console.log(e);
        })
    }

    const getTasks = (rms_id) => {
        getTasksPage(rms_id, 1).then((response) => {
            const tasks = response.data.content;
            console.log("FF");
            console.log(tasks);
            if (response.status === 204) {
                setRoadmapContext((prev) => ({...prev, tasks: []}));
                return;
            }
            if (response?.data?.pagination?.total_pages-1 === 0) {
                console.log({...roadmapContext, tasks: tasks});
                setRoadmapContext((prev) => ({...prev, tasks: tasks}));
                return;
            }
            if (response.data) {
                for (let i = 2; i <= response.data.pagination.total_pages; i++) {
                    getTasksPage(pr_id, i).then((response) => {
                        setRoadmapContext((prev) => ({...prev, tasks: tasks.concat(response.data.content)}));
                    })
                }
            }
        })
    }

    const CreateTask = (pr_id, rms_id, status, name, description, deadlineAt, attachment) => {
        createTask(rms_id, status, name, description, deadlineAt, attachment).then((response) => {
            setRoadmapContext((prev) => ({...prev, tasks: [...prev.tasks, response.data]}));
            getStages(pr_id);
        }).catch((e) => {
            console.log("error in Create task");
            console.log(e);
        })
    }

    return { getStages, CreateStage, getTasks, CreateTask };
}