import { useContext } from "react";
import ErrorContext from "../context/ErrorContextProvider";

const useErrorContext = () => {
    return useContext(ErrorContext);
}

export default useErrorContext;