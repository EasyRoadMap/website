import { DeleteQuery } from "../DeleteQuery";

export const deleteWorkspace = (ws_id) => {
    const URL = "/api/v1/workspace";
    return DeleteQuery(URL, {ws_id: ws_id});
}
