import { GetQuery } from "../GetQuery.js";

export const getWorkspaceMembers = (ws_id) => {
    const URL = "/api/v1/workspace/members";
    return GetQuery(URL, {ws_id: ws_id});
}
