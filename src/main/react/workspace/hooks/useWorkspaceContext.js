import { useContext } from "react";
import WorkspaceContext from "../context/WorkspaceContextProvider";

const useWorkspaceContext = () => {
    return useContext(WorkspaceContext);
}

export default useWorkspaceContext;