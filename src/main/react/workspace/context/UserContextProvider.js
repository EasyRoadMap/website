import React from 'react';
import {createContext, useState} from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({});
    const [firstAnswerReceived, setFirstAnswerReceived] = useState(false);

    return (
        <UserContext.Provider value={{ userContext, setUserContext, firstAnswerReceived, setFirstAnswerReceived }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;