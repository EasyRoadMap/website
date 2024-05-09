import { useContext } from "react";
import WorkspaceContext from "../context/WorkspaceContextProvider.js";

const useWorkspaceContext = () => {
    return useContext(WorkspaceContext);
}

export default useWorkspaceContext;