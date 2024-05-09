import React from 'react';
import {createContext, useState} from "react";

const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
    const [tasksContext, setTasksContext] = useState({});

    return (
        <TasksContext.Provider value={{ tasksContext, setTasksContext }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContext;