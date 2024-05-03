import { useState, useEffect } from "react";
import useRoadmapContext from "./useRoadmapContext.js";
import { getStagesPage } from "../api/roadmap-api/getStagesPage.js";
import { createStage } from "../api/roadmap-api/createStage.js";
import { deleteStage } from "../api/roadmap-api/deleteStage.js";
import { getTasksPage } from "../api/roadmap-api/getTasksPage.js"
import { createTask } from "../api/roadmap-api/createTask.js"
import { getStage } from "../api/roadmap-api/getStage.js";
import { putTask } from "../api/roadmap-api/putTask.js";
import { getTask } from "../api/roadmap-api/getTask.js";
import { deleteTask } from "../api/roadmap-api/deleteTask.js";
import { addAttachment } from "../api/roadmap-api/addAttachment.js";
import { getAttachment } from "../api/roadmap-api/getAttachment.js";
import { getAttachments } from "../api/roadmap-api/getAttachments.js";

export const useRoadmapInfo = () => {
    const { roadmapContext, setRoadmapContext } = useRoadmapContext();

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

    const DeleteStage = (pr_id, rms_id) => {
        deleteStage(rms_id).then((response) => {
            getStages(pr_id);
        }).catch((e) => {
            console.log("error in Delete Stage");
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

    const ChangeTask = (rms_id, rmt_id, status, name, description, deadlineAt, attachment) => {
        putTask(rmt_id, status, name, description, deadlineAt, attachment).then((response) => {
            getTasks(rms_id);
        }).catch((e) => {
            console.log("error in Change Task");
            console.log(e);
        })
    }

    const DeleteTask = (rms_id, rmt_id) => {
        deleteTask(rmt_id).then((response) => {
            getTasks(rms_id);
        }).catch((e) => {
            console.log("error in Delete Task");
            console.log(e);
        })
    }

    const Attachments = (rmt_id) => {
        getAttachments(rmt_id).then((response) => {
            const updatedTasks = tasks.map((task) => {
                if (task.id === rmt_id) return {
                    ...task, attachments: response.data
                }
                return task;
            })
            setRoadmapContext((prev) => ({...prev, tasks: updatedTasks}));
        }).catch((e) => {
            console.log("error in Attachments");
            console.log(e);
        })
    }

    const AddAttachment = (rms_id, attachment) => {
        addAttachment(rms_id, attachment).then((response) => {
            Attachments(rms_id);
        }).catch((e) => {
            console.log("error in Delete Task");
            console.log(e);
        })
    }

    return { getStages, CreateStage, DeleteStage, getTasks, CreateTask, ChangeTask, DeleteTask };
}