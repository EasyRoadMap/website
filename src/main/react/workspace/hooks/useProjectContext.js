import { useContext } from "react";
import ProjectContext from "../context/ProjectContextProvider.js";

const useProjectContext = () => {
    return useContext(ProjectContext);
}

export default useProjectContext;