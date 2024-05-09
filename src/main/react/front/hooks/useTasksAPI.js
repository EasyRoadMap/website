import { getTasks } from "../api/getTasks.js";

import useTasksContext from "./useTasksContext.js";

export const useTasksAPI = () => {
    const { setTasksContext } = useTasksContext();

    const GetTasks = (rms_id) => {
        getTasks(rms_id).then((response) => {
            setTasksContext(response.data);
        }).catch((e) => {
            console.error(e);
        })
    };

    return { GetTasks };
}