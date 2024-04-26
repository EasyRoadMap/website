import { DeleteQuery } from "../DeleteQuery";

export const deleteWorkspace = (ws_id, password) => {
    const URL = "/api/v1/workspace";
    return DeleteQuery(URL, {password: password}, {ws_id: ws_id});
}
