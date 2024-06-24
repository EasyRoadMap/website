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

import useErrorContext from "./useErrorContext.js";
import { getRoadmapError } from "../errors/roadmap_errors.js";

export const useRoadmapInfo = () => {
    const { pushError } = useErrorContext();
    const { roadmapContext, setRoadmapContext } = useRoadmapContext();

    const handleError = (e) => {
        const error_message = getRoadmapError(e?.response?.data?.error_code);
        pushError(error_message, "error");
    }

    const getStages = (pr_id, callback) => { 
        getStagesPage(pr_id, 1).then((response) => {
            const stages = response.data.content;
            if (response.status === 204) {
                setRoadmapContext((prev) => ({...prev, stages: []}));
                if (callback) callback();
                return;
            }
            if (response?.data?.pagination?.total_pages-1 === 0) {
                setRoadmapContext((prev) => ({...prev, stages: stages}));
                if (callback) callback();
                return;
            }
            if (response.data) {
                for (let i = 2; i <= response.data.pagination.total_pages; i++) {
                    getStagesPage(pr_id, i).then((response) => {
                        setRoadmapContext((prev) => ({...prev, stages: stages.concat(response.data.content)}));
                    })
                }
                if (callback) callback();
            }
        }).catch((e) => {
            handleError(e);
        })
    }

    const Stage = (rms_id) => {
        getStage(rms_id).then((response) => {
            setRoadmapContext((prev) => ({...prev, stages: [... new Set(prev.stages.concat([response.data]))] }));
        }).catch((e) => {
            handleError(e);
        })
    }

    const CreateStage = (pr_id, name, onSuccess) => {
        createStage(pr_id, name).then((response) => {
            getStages(pr_id);
            onSuccess(response.data);
        }).catch((e) => {
            handleError(e);
        })
    }

    const DeleteStage = (pr_id, rms_id, onSuccess) => {
        deleteStage(rms_id).then((response) => {
            getStages(pr_id, onSuccess);
        }).catch((e) => {
            handleError(e);
        })
    }

    const getTasks = (rms_id) => {
        getTasksPage(rms_id, 1).then((response) => {
            const tasks = response.data.content;
            if (response.status === 204) {
                setRoadmapContext((prev) => ({...prev, tasks: []}));
                return;
            }
            if (response?.data?.pagination?.total_pages-1 === 0) {
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
        }).catch((e) => {
            handleError(e);
        })
    }

    const CreateTask = (pr_id, rms_id, status, name, description, deadlineAt, attachment) => {
        createTask(rms_id, status, name, description, deadlineAt, attachment).then((response) => {
            setRoadmapContext((prev) => ({...prev, tasks: [...prev.tasks, response.data]}));
            getStages(pr_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const ChangeTask = (pr_id, rms_id, rmt_id, status, name, description, deadlineAt, attachment) => {
        putTask(rmt_id, status, name, description, deadlineAt, attachment).then((response) => {
            getTasks(rms_id);
            getStages(pr_id);
        }).catch((e) => {
            handleError(e);
        })
    }

    const DeleteTask = (rms_id, rmt_id) => {
        deleteTask(rmt_id).then((response) => {
            getTasks(rms_id);
        }).catch((e) => {
            handleError(e);
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
            handleError(e);
        })
    }

    const UploadAttachment = (rms_id, attachment, callback) => {
        addAttachment(rms_id, attachment).then((response) => {
            // Attachments(rmt_id);
            if (callback) callback(response.data.id);
        }).catch((e) => {
            handleError(e);
        })
    }


    return { getStages, CreateStage, DeleteStage, getTasks, CreateTask, ChangeTask, DeleteTask, UploadAttachment };
}