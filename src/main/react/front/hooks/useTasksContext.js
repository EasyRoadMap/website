import { useContext } from "react";
import TasksContext from "../context/TasksContextProvider";

const useTasksContext = () => {
    return useContext(TasksContext);
}

export default useTasksContext;