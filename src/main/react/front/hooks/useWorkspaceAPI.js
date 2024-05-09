import { getWorkspace } from "../api/getWorkspace.js";

import useWorkspaceContext from "./useWorkspaceContext.js";

export const useWorkspaceAPI = () => {
    const { setWorkspaceContext } = useWorkspaceContext();

    const GetWorkspace = (ws_id) => {
        getWorkspace(ws_id).then((response) => {
            setWorkspaceContext(response.data);
        }).catch((e) => {
            console.error(e);
        })
    };

    return { GetWorkspace };
}