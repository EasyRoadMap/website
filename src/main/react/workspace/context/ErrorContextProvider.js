import React from 'react';
import {createContext, useState, useEffect} from "react";

const ErrorContext = createContext({});

export const ErrorProvider = ({ children }) => {
    const [errorContext, setErrorContext] = useState([]);

    const pushError = (message, type) => {
        setErrorContext((prev) => [{message: message, type: type}])
        // setErrorContext((prev) => prev?.length > 0 ? [...prev, {message: message, type: type}] : [{message: message, type: type}])
    }

    return (
        <ErrorContext.Provider value={{ errorContext, setErrorContext, pushError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorContext;