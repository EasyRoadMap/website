import React from 'react';
import {createContext, useState} from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({});

    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;