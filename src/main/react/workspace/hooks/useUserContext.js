import { useContext } from "react";
import UserContext from "../context/UserContextProvider.js";

const useUserContext = () => {
    return useContext(UserContext);
}

export default useUserContext;